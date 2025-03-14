from datetime import datetime
from babel.dates import format_datetime
from email.utils import formatdate
from fastapi import HTTPException, status
from sqlmodel import Session, select
from schema.cart_item_schema import CartItemUpdateSchema 
from models.cart import Cart
from models.cart_state import CartState
from models.product import Product
from models.cart_item import CartItem
from schema.cart_item_schema import CartItemSchema
from sqlalchemy.orm import selectinload


class CartService:
    @staticmethod
    def get_all_carts(session:Session):
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
    
    @staticmethod
    def get_cart_active(session:Session, id_user:int):
        cartItemStatement = (select(Cart)
                            .join(CartState)
                            .options(selectinload(Cart.cart_items))
                            .where(CartState.name == "activado")
                            .where(Cart.id_user == id_user))
        anCart = session.exec(cartItemStatement).first()
        if not anCart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="El carrito esta vacio"
            )
        
        return anCart
    
    @staticmethod
    def create_cart(session:Session, id_user:int):
        # busca si hay un carrito activo
        cartItemStatement = (select(Cart)
                            .join(CartState)
                            .where(CartState.name == "activado")
                            .where(Cart.id_user == id_user))
        anCart = session.exec(cartItemStatement).first()
        
        # si no hay un carrito activo, crea un nuevo carrito
        if not anCart:
            
            stateCartItemStatement = (select(CartState)
                        .where(CartState.name == "activado"))
            anState = session.exec(stateCartItemStatement).first()
            if not anState:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No se encontro un estado de carro"
                )
        
            date = datetime.now()
            newDate = format_datetime(date, locale='es_ES')
            
            newCart = Cart(id_user=id_user, createdAt=newDate, state_id=anState.id, state=anState, totalCart=0.0)
            
            session.add(newCart)
            session.commit()
            session.refresh(newCart)
            
            return {"message" : "Carrito creado con exito"}
        
        return {"message" : "Existe un carrito activado"}
    
    @staticmethod
    def save_item_in_cart(session:Session, id_user:int, anItem:CartItemSchema):
        cartItemStatement = (select(Cart)
                            .join(CartState)
                            .where(CartState.name == "activado")
                            .where(Cart.id_user == id_user))
        cartUser = session.exec(cartItemStatement).first()
        if not cartUser:
            stateCartItemStatement = (select(CartState)
                        .where(CartState.name == "activado"))
            anState = session.exec(stateCartItemStatement).first()
            if not anState:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No se encontro un estado de carro"
                )
        
            date = datetime.now()
            newDate = format_datetime(date, locale='es_ES')
            
            cartUser = Cart(id_user=id_user, createdAt=newDate, state_id=anState.id, state=anState, totalCart=0.0)
            
            session.add(cartUser)
            session.commit()
            session.refresh(cartUser)
        
        productStatement = (select(Product)
                            .where(Product.id == anItem.id_product))
        productFromItem = session.exec(productStatement).first()
        if not productFromItem:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el producto"
            )
            
        newCartItem = CartItem(**anItem.model_dump())
        
        newCartItem.id_cart = cartUser.id_user
        newCartItem.cart = cartUser
        newCartItem.product = productFromItem
        
        productFromItem.stockCurrent -= newCartItem.quantity
        
        session.add(productFromItem)
        session.commit()
        
        session.add(newCartItem)
        session.commit()
        session.refresh(newCartItem)
        
        
        newTotalCart = 0.0
        for item in cartUser.cart_items:
            newTotalCart += item.unityPrice
        
        cartUser.totalCart = round(newTotalCart,2)
        cartUser.cart_items.append(newCartItem)
        
        session.add(cartUser)
        session.commit()
        session.refresh(cartUser)
        
        return {"message" : "Item agregado con exito al carrito"}
    
    @staticmethod
    def get_cart(session:Session, id:int):
        statement = (select(Cart)
            .join(CartState)
            .options(selectinload(Cart.state), selectinload(Cart.cart_items))
            .where(Cart.id_user == id))

        cart = session.exec(statement).first()

        return cart
    
    @staticmethod
    def get_item_cart(session:Session, id_item:int):
        statement = (select(CartItem)
                    .options(selectinload(CartItem.product))
                    .where(CartItem.id == id_item))
        itemCart = session.exec(statement).first() 
        
        if not itemCart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el item del carrito"
            )
        
        return itemCart
    
    @staticmethod
    def modify_item_cart(session:Session, id_item:int,itemCartUpdate:CartItemUpdateSchema):
        
        print(f"-----------------{itemCartUpdate.model_dump()}")
        
        
        cartItemStatement = (select(CartItem)
                        .where(CartItem.id == id_item))
        
        itemCart = session.exec(cartItemStatement).first()
        
        cart = itemCart.cart
        product = itemCart.product
        
        if itemCartUpdate.quantity > itemCart.quantity :
            product.stockCurrent -= itemCartUpdate.quantity

        elif itemCartUpdate.quantity < itemCart.quantity:
            product.stockCurrent += itemCart.quantity - itemCartUpdate.quantity

        
        session.add(product)
        session.commit()
        session.refresh(product)
        
        #actualiza el el precio total del item, y la cantidad de un item
        itemCart.unityPrice = itemCartUpdate.unityPrice
        itemCart.quantity = itemCartUpdate.quantity
        
        newTotalCart = 0.0
        
        for item in cart.cart_items:
            newTotalCart += item.unityPrice
            
        cart.totalCart = round(newTotalCart,2)
        
        session.add_all([itemCart, cart])
        session.commit()
        session.refresh(itemCart)
        
        return {"message":"Item del carrito editado con exito"}
    
    @staticmethod
    def delete_a_item_from_cart(session:Session,id_item:int):
        cartItemStatement = (select(CartItem)
                    .where(CartItem.id == id_item))
        cartItem = session.exec(cartItemStatement).first()
        
        cart = cartItem.cart

        product = cartItem.product
        ## si el stock concurrent no supera al stockMax, se sumara, 
        if not (product.stockCurrent + cartItem.quantity > product.stockMax):
            product.stockCurrent += cartItem.quantity
        else:
            product.stockCurrent = product.stockMax
        
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
        
        cart.totalCart = round(newTotalCart, 2)
        
        if len(cart.cart_items) == 0:
            stateCart = (select(CartState)
                         .where(CartState.name == "cancelado"))
            state = session.exec(stateCart).first()
            
            cart.state_id = state.id
            cart.state = state
            
        session.add_all([product, cart])
        session.commit()
        session.refresh(product)
        
        return {"message":"Item del carrito eliminado con exito"}
    