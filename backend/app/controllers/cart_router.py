from collections import defaultdict
from datetime import datetime
import locale
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from models.product import Product
from models.category import Category
from models.user import User
from models.cart import Cart
from models.cart_state import CartState
from models.cart_item import CartItem

from schema.product_schema import *
from schema.category_schema import * 
from schema.user_schema import *
from schema.cart_schema import *
from schema.cartItem_schema import * 
from schema.order_schema import *
from schema.orderItem_schema import *
from schema.cart_item_update_schema import *

from sqlalchemy.orm.attributes import flag_modified
from fastapi.responses import JSONResponse

locale.setlocale(locale.LC_TIME, "es_ES") 

router = APIRouter(tags=["Cart"], prefix="/cart")

@router.get("/")
async def get_all_cart(sessio:Session=Depends(get_session)):
    cartStatement = (select(Cart))
    cart = sessio.exec(cartStatement).all()
    
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay carritos registrados"
        )
    
    return cart

@router.put("/createCart/{id}")
async def add_product_cart(id:int, session:Session = Depends(get_session)):
    
    cartItemStatement = (select(Cart)
                     .where(Cart.state_id == 1))
    anCart = session.exec(cartItemStatement).all()
    
    # si no hay un carrito activo, crea un nuevo carrito
    if not anCart:
        
        stateCartItemStatement = (select(CartState)
                     .where(CartState.name == "activo"))
        anState = session.exec(stateCartItemStatement).first()
    
        date = datetime.now()
        newDate = date.strftime("%d de %B de %Y | a las %H:%M")
        
        newCart = Cart(id_user=id, createdAt=newDate, state_id=anState.id, state=anState, totalCart=0)
        
        session.add(newCart)
        session.commit()
        session.refresh(newCart)
        
        return newCart
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Hay un carrito ya activo"
    )

@router.put("/saveItemInCart/{id}")
async def save_item_in_cart(id:int, anItem:CartItemSchema, session:Session = Depends(get_session)):
    cartItemStatement = (select(Cart)
                    .where(Cart.id_user == id))
    
    productStatement = (select(Product)
                        .where(Product.id == anItem.id_product))
    
    productFromItem = session.exec(productStatement).first()
    cartUser = session.exec(cartItemStatement).first()
    
    newCartItem = CartItem(**anItem.model_dump())
    
    newCartItem.id_cart = cartUser.id
    newCartItem.cart = cartUser
    newCartItem.product = productFromItem
    
    session.add(newCartItem)
    session.commit()
    session.refresh(newCartItem)
    
    
    newTotalCart = 0.0
    for item in cartUser.cart_items:
        newTotalCart += item.unityPrice
        print(f"-------------save{newTotalCart}")
    
    cartUser.totalCart = newTotalCart
    cartUser.cart_items.append(newCartItem)
    
    session.add(cartUser)
    session.commit()
    session.refresh(cartUser)
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Item guardado en el carrito con exito"
    )
    

@router.get("/getCart/{id}")
async def get_cart(id:int, session:Session = Depends(get_session)):
    statement = (select(Cart)
                 .join(CartState)
                 .where(Cart.id_user == id)
                 .where(CartState.name == "activo")
                 .options(selectinload(Cart.cart_items)))
    
    cart = session.exec(statement).first()
    
    if cart:
        response = {
            "id":cart.id,
            "totalCart":cart.totalCart,
            "createdAt":cart.createdAt,
            "cart_items":cart.cart_items,
        }
        return response
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito vacio"
        )
    
@router.get("/getItemCart/{id}/{id_cart}")
async def get_item_cart(id:int, id_cart:int, session:Session = Depends(get_session)):
    statement = (select(CartItem)
                 .join(Product)
                 .where(Cart.id == id_cart)
                 .where(Cart.id_user == id))
    itemCart = session.exec(statement).first() 
    
    if not itemCart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontro el item del carrito"
        )
        
    item_response = {
        "id": itemCart.id,
        "id_cart": itemCart.id_cart,
        "id_product": itemCart.id_product,
        "quantity" : itemCart.quantity,
        "unityPrice" : itemCart.unityPrice,
        
        "product" : itemCart.product
    }
    
    return item_response

@router.put("/modifyAnItemCart/{id_item}")
async def modify_item_cart(id_item:int,itemCartUpdate:CartItemUpdateSchema ,session:Session = Depends(get_session)):
    
    cartItemStatement = (select(CartItem)
                     .where(CartItem.id == id_item))
    
    itemCart = session.exec(cartItemStatement).first()
    
    
    #actualiza el el precio total del item, y la cantidad de un item
    itemCart.unityPrice = itemCartUpdate.unityPrice
    itemCart.quantity = itemCartUpdate.quantity
    
    #actualiza el stockCurrent de un producto
    product = itemCart.product
    product.stockCurrent = itemCartUpdate.stockCurrent
    
    newTotalCart = 0.0
    cart = itemCart.cart
    
    for item in cart.cart_items:
        newTotalCart += item.unityPrice
        print(f"-------------modificar{newTotalCart}")
        
    cart.totalCart = newTotalCart
    
    session.add_all([product, itemCart, cart])
    session.commit()
    session.refresh(product)
    session.refresh(itemCart)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="item del carrito editado con exito"
    )
          
@router.put("/deleteItemCart/{id_item}")
async def delete_a_item_from_cart(id_item:int, session:Session = Depends(get_session)):

    cartItemStatement = (select(CartItem)
                 .where(CartItem.id == id_item))
    cartItem = session.exec(cartItemStatement).first()
    
    cart = cartItem.cart

    product = cartItem.product
    product.stockCurrent += cartItem.quantity
    
    index = 0
    
    for item in cart.cart_items:
        if item.id == id_item:
            session.delete(item)
            del cart.cart_items[index]
            session.commit()
            session.refresh(cart)
        index += 1
            
    newTotalCart = 0.0
    for item in cart.cart_items:
        newTotalCart += item.unityPrice
        print(f"-------------delete{newTotalCart}")
    
    cart.totalCart = newTotalCart
        
    session.add_all([product, cart])
    session.commit()
    session.refresh(product)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Item de carrito eliminado"
    )