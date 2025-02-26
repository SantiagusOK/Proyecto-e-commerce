from collections import defaultdict
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import func
from db.connect import get_session
from sqlmodel import Session, select
from models.product import ProductModel, Product
from models.category import CategoryModel, Category
from models.user import User, UserModel, UserLoginModel, UserAdminModel
from models.cart import CartModel, Cart, CartUpdate
from models.order import OrderModel, Order
from models.orderItem import OrderItem, OrderItemModel
from models.state import State
from sqlalchemy.orm.attributes import flag_modified
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Carrito"], prefix="/carrito")

@router.put("/setCarrito/{idUser}")
async def add_product_cart(idUser:int, anProduct:CartModel, session:Session = Depends(get_session)):
    

    newCart = Cart(**anProduct.model_dump())
    
    productStatement = (select(Product)
                        .where(Product.id == anProduct.id_product))
    productResult = session.exec(productStatement).first()
    
    stateStatement = select(State).where(State.name == "seleccionado")
    anState = session.exec(stateStatement).first()
    
    newCart.product = productResult
    newCart.state_id = anState.id
    newCart.state = anState
    
    
    session.add(newCart)
    session.commit()
    session.refresh(newCart)
    
    statement = select(Product).where(Product.id == anProduct.id_product)
    product = session.exec(statement).first()

    product.stock -= anProduct.cantidad

    if product.stock < 0:
        product.stock = 0

    session.add(product)
    session.commit()
    session.refresh(product)

    raise HTTPException(
    status_code=status.HTTP_200_OK,
    detail="Producto agregado al carrito"
    )

def search_value(value:User ,session:Session):
    result = session.exec(select(User)).all()
    
    for user in result:
        if user.username == value.username:
            return value

@router.get("/getCarrito/{idUser}")
async def get_all_carrito(idUser:int, session:Session = Depends(get_session)):
    statement = (select(User, Cart)
                 .join(Cart, Cart.id_usuario == User.id)
                 .where(User.id == idUser).where(Cart.eliminado == False))
    cart = session.exec(statement).all()
    if cart:
        response = [
            {
                "total":itemCarrito.total,
                "cantidad":itemCarrito.cantidad,
                "id_item_carrito":itemCarrito.id,
                "product":itemCarrito.product,
                "categorieProduct":itemCarrito.product.category
            }
            for Users, itemCarrito in cart
        ]
        
        return list(reversed(response))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Carrito vacio"
        )
    
@router.get("/getItemCarrito/{idItem}/{idUser}")
async def get_all_carrito(idItem:int, idUser:int, session:Session = Depends(get_session)):
    statement = (select(Cart, Product)
                 .join(Product, Product.id == Cart.id_product)
                 .where(Cart.id == idItem)
                 .where(Cart.id_usuario == idUser))
    itemCart = session.exec(statement).first() 
    
    itemCarrito, product = itemCart 

    response = {
        "product": product.name,
        "product_price":product.price,
        "cantidad":itemCarrito.cantidad,
        "total":itemCarrito.total,
        "id_item_carrito":itemCarrito.id,
        "stock_product":product.stock
    }
    return response

@router.put("/modifyAnItemCart/{idItem}")
async def get_all_carrito(idItem:int,itemCartUpdate:CartUpdate ,session:Session = Depends(get_session)):
    
    statement = select(Cart).where(Cart.id == idItem)
    itemCart = session.exec(statement).first()
    
    itemCart.total = itemCartUpdate.total
    itemCart.cantidad = itemCartUpdate.cantidad
    
    statementNew = select(Product).where(Product.id == itemCart.id_product)
    product = session.exec(statementNew).first()
    product.stock = itemCartUpdate.stockProduct
    
    session.add_all([product, itemCart])
    session.commit()
    session.refresh(product)
    session.refresh(itemCart)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="item del carrito editado con exito"
    )
            
@router.put("/deleteAnItemCart/{idItem}")
async def delete_a_item_from_cart(idItem:int, session:Session = Depends(get_session)):

    statement = (select(Cart)
                 .where(Cart.id == idItem))
    itemCart = session.exec(statement).first()
    
    itemCart.eliminado = True

    statementNew = select(Product).where(Product.id == itemCart.id_product)
    product = session.exec(statementNew).first()

    product.stock += itemCart.cantidad  
      
    session.add_all([product, itemCart])
    session.commit()
    session.refresh(product)
    session.refresh(itemCart)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail="Item de carrito eliminado"
    )
@router.put("/realizeABuy/{idUser}")
async def realize_a_buy(idUser:int, comprasModel:OrderModel, session:Session = Depends(get_session)):
    
    newCompraItem = Order(**comprasModel.model_dump())
    
    session.add(newCompraItem)
    session.commit()
    session.refresh(newCompraItem)
    
    statementCarrito = select(Cart).where(Cart.id_usuario == idUser, Cart.eliminado == False)
    
    itemCart = session.exec(statementCarrito).all()
    
    for item in itemCart:
        newProductCompra = OrderItem(
            id_compra=newCompraItem.id,
            id_product=item.id_product,
            total_por_cantidad=item.total,
            cantidad=item.cantidad
            )
        
        item.eliminado = True
        
        newCompraItem.orders.append(newProductCompra)
        
        session.add(newCompraItem)
        session.add(item)
        session.commit()
        session.refresh(newCompraItem)
    
    raise HTTPException(
        status_code=status.HTTP_202_ACCEPTED,
        detail="Compra realizada"
    )
     
@router.get("/getAllBuy/{idUser}")
async def get_buy(idUser:int, session:Session = Depends(get_session)):
    
    statement = (select(Order)
                 .where(Order.id_user == idUser))
    
    result = session.exec(statement).all()

    
    response =[
        {
            "fechaCompra": itemCompra.fechaDeCompra,
            "totalCompra" : itemCompra.totalCompra,
            "productos" : itemCompra.orders,
            
        }
        for itemCompra in result
    ]
    
    return list(reversed(response))

async def clear_all_carrito(idUser:int, session:Session):
    statement = (select(Cart).where(Cart.id_usuario == idUser))
    itemCart = session.exec(statement).all()
    for item in itemCart:
        item.eliminado = True
        session.add(item)
        session.commit()
        session.refresh(item)
        
        
    
