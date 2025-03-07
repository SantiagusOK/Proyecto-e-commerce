
from datetime import datetime
from fastapi import Depends, HTTPException, status
from sqlmodel import Session, select

from schema.cart_item_update_schema import CartItemUpdateSchema

from models.cart import Cart
from models.cart_state import CartState
from models.product import Product
from models.cart_item import CartItem

from schema.cartItem_schema import CartItemSchema

from sqlalchemy.orm import selectinload

class CartService:
    @staticmethod
    
    def get_all_cart(session:Session):
        cartStatement = (select(Cart)
                         .options(
                             selectinload(Cart.state),
                             selectinload(Cart.cart_items)))
        cart = session.exec(cartStatement).all()
        
        if not cart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No hay carritos registrados"
            )
        
        return cart

    def get_cart_active(session:Session, id_user:int):
        cartItemStatement = (select(Cart)
                            .join(CartState)
                            .options(selectinload(Cart.cart_items))
                            .where(CartState.name == "activo")
                            .where(Cart.id_user == id_user))
        anCart = session.exec(cartItemStatement).first()
        
        print(f"----------------------{anCart}")
        return anCart
    
    def create_cart(session:Session, id_user:int):
        # busca si hay un carrito activo
        cartItemStatement = (select(Cart)
                            .join(CartState)
                            .where(CartState.name == "activo")
                            .where(Cart.id_user == id_user))
        anCart = session.exec(cartItemStatement).all()
        
        # si no hay un carrito activo, crea un nuevo carrito
        if not anCart:
            
            stateCartItemStatement = (select(CartState)
                        .where(CartState.name == "activo"))
            anState = session.exec(stateCartItemStatement).first()
        
            date = datetime.now()
            newDate = date.strftime("%d de %B de %Y | a las %H:%M")
            
            newCart = Cart(id_user=id_user, createdAt=newDate, state_id=anState.id, state=anState, totalCart=0.0)
            
            session.add(newCart)
            session.commit()
            session.refresh(newCart)
            
            return {"message" : "Carrito creado con exito"}
        
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Hay un carrito ya activo")
    
    def save_item_in_cart(session:Session, id_user:int, anItem:CartItemSchema):
        cartItemStatement = (select(Cart)
                            .join(CartState)
                            .where(CartState.name == "activo")
                            .where(Cart.id_user == id_user))
        
        cartUser = session.exec(cartItemStatement).first()
        
        productStatement = (select(Product)
                            .where(Product.id == anItem.id_product))
        
        productFromItem = session.exec(productStatement).first()
        
        newCartItem = CartItem(**anItem.model_dump())
        
        newCartItem.id_cart = cartUser.id_user
        newCartItem.cart = cartUser
        newCartItem.product = productFromItem
        
        session.add(newCartItem)
        session.commit()
        session.refresh(newCartItem)
        
        
        newTotalCart = 0.0
        for item in cartUser.cart_items:
            newTotalCart += item.unityPrice
        
        cartUser.totalCart = round(newTotalCart)
        cartUser.cart_items.append(newCartItem)
        
        session.add(cartUser)
        session.commit()
        session.refresh(cartUser)
        
        return {"message" : "Item agregado con exito al carrito"}
    
    def get_cart(session:Session, id:int):
        statement = (select(Cart)
            .join(CartState)
            .options(selectinload(Cart.state), selectinload(Cart.cart_items))
            .where(Cart.id_user == id)
            .where(CartState.name == "activo"))

        cart = session.exec(statement).first()

        return cart
    
    def get_item_cart(session:Session, id:int, id_cart:int):
        statement = (select(CartItem)
                    .options(selectinload(CartItem.cart), 
                            selectinload(CartItem.product))
                    .where(Cart.id == id_cart)
                    .where(Cart.id_user == id))
        itemCart = session.exec(statement).first() 
        
        if not itemCart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el item del carrito"
            )
        
        return itemCart
    
    def modify_item_cart(session:Session, id_item:int,itemCartUpdate:CartItemUpdateSchema):
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
            
        cart.totalCart = round(newTotalCart)
        
        session.add_all([product, itemCart, cart])
        session.commit()
        session.refresh(product)
        session.refresh(itemCart)
        
        return {"message":"Item del carrito editado con exito"}

    def delete_a_item_from_cart(session:Session,id_item:int):
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
        
        cart.totalCart = round(newTotalCart)
        
        if len(cart.cart_items) == 0:
            stateCart = (select(CartState)
                         .where(CartState.name == "cancelado"))
            state = session.exec(stateCart).first()
            
            cart.state_id = state.id
            cart.state = state
        
        print(len(cart.cart_items))
        print(f"-----------------------------{cart.state}")
            
        session.add_all([product, cart])
        session.commit()
        session.refresh(product)
        
        return {"message":"Item del carrito eliminado con exito"}
    