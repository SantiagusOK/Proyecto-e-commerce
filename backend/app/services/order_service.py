from datetime import datetime
import locale
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from models.order_state_history import OrderStateHistory
from models.order import Order
from models.order_state import OrderState
from models.user import User
from models.cart import Cart
from models.cart_state import CartState
from models.order_item import OrderItem

from fastapi import HTTPException, status
locale.setlocale(locale.LC_TIME, "es_ES") 

class OrderServices:
    @staticmethod
    def get_all_order(session:Session):
        statement = (select(Order).
                     options(selectinload(Order.items)))
        allOrders = session.exec(statement).all()
        
        if not allOrders:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No hay ordenes de compra disponibles")
            
        return allOrders
    
    def set_order_state(id_order:int, id_state:int, session:Session):
        orderStateStatement = (select(OrderState)
                               .where(OrderState.id == id_state))
        orderStatement = (select(Order).where(Order.id == id_order))
        
        order = session.exec(orderStatement).first()
        orderState = session.exec(orderStateStatement).first()
        
        userStatement = (select(User).where(User.id == order.id_user))
        user = session.exec(userStatement).first()
        
        cartStatement = (select(Cart)
                        .join(CartState)
                        .where(Cart.id_user == user.id, CartState.name == "activo"))

        cartStateStatement = (select(CartState)
                        .where(CartState.name == "finalizado"))
        
        cart_state = session.exec(cartStateStatement).first()
        cart = session.exec(cartStatement).first()
        
        # Actualizar estado del carrito
        cart.state_id = cart_state.id
        cart.state = cart_state
        session.commit()
        
        date = datetime.now()
        newDate = date.strftime("%d de %B de %Y | a las %H:%M")
        
        newOrdeStateHistory = OrderStateHistory(
            id_user=user.id,
            id_order=order.id,
            id_orderState=orderState.id,
            changeAt=newDate,
            order= order,
            state=orderState,
            user=user
        )
        
        session.add(newOrdeStateHistory)
        session.commit()
        session.refresh(newOrdeStateHistory)
        
        order.id_state = orderState.id
        order.state = orderState
        
        order.ordersHistory.append(newOrdeStateHistory)
        user.orderStateHistory = newOrdeStateHistory
        orderState.stateList.append(newOrdeStateHistory)
        
        session.add_all([user,order,orderState])
        session.commit()
        
        return {"message" : "Estado de la orden actualizada con exito"}
        
    def get_order(session:Session, id_order:int):
        orderStatement = (select(Order)
                          .options(selectinload(Order.items))
                          .where(Order.id == id_order))
        order = session.exec(orderStatement).first()
        
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro la orden"
            )
        
        return order
    
    def create_order(session:Session, id_user:int):
        
        cartStatement = (select(Cart)
                            .where(Cart.id_user == id_user))
        userStatement = (select(User)
                        .where(User.id == id_user))
        orderStateStatement = (select(OrderState)
                        .where(OrderState.name == "pendiente"))
        cartStateStatement = (select(CartState)
                        .where(CartState.name == "finalizado"))
        
        cartState = session.exec(cartStateStatement).first()
        orderState = session.exec(orderStateStatement).first()
        cartUser = session.exec(cartStatement).first()
        user = session.exec(userStatement).first()
        
        cartUser.state_id = cartState.id
        cartUser.state = cartState
        
        session.add(cartUser)
        session.commit()
        
        date = datetime.now()
        newDate = date.strftime("%d de %B de %Y | a las %H:%M")
        
        newOrden = Order(
            id_user=id_user, 
            date=newDate, 
            totalOrder=cartUser.totalCart,
            id_address=user.address.id,
            id_state=orderState.id,
            state=orderState,
            address=user.address
            )
        
        session.add(newOrden)
        session.commit()
        session.refresh(newOrden)
        
        for item in cartUser.cart_items:
            newOrdenItem = OrderItem(
                id_order=newOrden.id,
                id_product=item.product.id,
                amountTotal=item.unityPrice,
                amount=item.quantity,
                order=newOrden
            )        
            newOrden.orders.append(newOrdenItem)
            session.add_all([newOrdenItem, newOrden])
            session.commit()
        
        newOrdeStateHistory = OrderStateHistory(
            id_user=user.id,
            id_order=newOrden.id,
            id_orderState=orderState.id,
            changeAt=newDate,
            order= newOrden,
            state=orderState,
            user=user
        )
        
        orderState.order.append(newOrden)
        orderState.stateList.append(newOrdeStateHistory)
        
        session.add(newOrdeStateHistory)
        session.commit()
        
        return {"message" : "orden creada con exito"}
            
                
        
    