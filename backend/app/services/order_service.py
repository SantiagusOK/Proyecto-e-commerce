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
from babel.dates import format_datetime

class OrderServices:
    @staticmethod
    def get_all_orders_user(session:Session, id_user:int):
        statement = (select(Order)
                     .where(Order.id_user == id_user)
                     .options(selectinload(Order.items)))
        order = session.exec(statement).all()
        
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Orden no encontrada, o no existe"
            )
        
        return list(reversed(order))
    
    @staticmethod
    def get_all_orders(session:Session):
        statement = (select(Order).
                     options(selectinload(Order.items)))
        allOrders = session.exec(statement).all()
        
        if not allOrders:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No hay ordenes de compra disponibles")
            
        return allOrders

    @staticmethod    
    def finish_order(session:Session, id_order:int):
        
        orderStateStatement = (select(OrderState)
                                .where(OrderState.name == "finalizado"))
        orderState = session.exec(orderStateStatement).first()
        if not orderState:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el orderState, o no existe"
            )
        
        orderStatement = (select(Order).where(Order.id == id_order))
        order = session.exec(orderStatement).first()
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro la orden, o no existe"
            )

        userStatement = (select(User).where(User.id == order.id_user))
        user = session.exec(userStatement).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el usuario, o no existe"
            )
        
        date = datetime.now()
        newDate = format_datetime(date, locale='es_ES')
        
        newOrdeStateHistory = OrderStateHistory(
            id_user=user.id,
            id_order=order.id,
            id_orderState=orderState.id,
            changeAt=newDate,
            order= order,
            state=orderState,
            user=user
        )
        
        print(f"-----------------------{newOrdeStateHistory}")
        
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
        

    @staticmethod
    def cancel_order(session:Session, id_order:int):
        orderStateStatement = (select(OrderState)
                                .where(OrderState.name == "cancelado"))
        orderState = session.exec(orderStateStatement).first()
        if not orderState:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el orderState, o no existe"
            )

        orderStatement = (select(Order).where(Order.id == id_order))
        order = session.exec(orderStatement).first()
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro la orden, o no existe"
            )

        userStatement = (select(User).where(User.id == order.id_user))
        user = session.exec(userStatement).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el usuario, o no existe"
            )

        date = datetime.now()
        newDate = format_datetime(date, locale='es_ES')

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

    @staticmethod        
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

    @staticmethod    
    def create_order(session:Session, id_user:int):
        
        cartStatement = (select(Cart)
                         .join(CartState)
                         .options(selectinload(Cart.cart_items))
                         .where(Cart.id_user == id_user, CartState.name == "activado"))
        cartUser = session.exec(cartStatement).first()
        if not cartUser:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el carrito del usuario, o no existe"
            )
        
        userStatement = (select(User)
                        .where(User.id == id_user))
        user = session.exec(userStatement).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el usuario, o no existe"
            )
        
        orderStateStatement = (select(OrderState)
                        .where(OrderState.name == "pendiente"))
        orderState = session.exec(orderStateStatement).first()
        if not orderState:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el orderState, o no existe"
            )
        
        cartStateStatement = (select(CartState)
                        .where(CartState.name == "finalizado"))
        cartState = session.exec(cartStateStatement).first()
        if not cartUser:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontro el cart_state, o no existe"
            )
        
        cartUser.state_id = cartState.id
        cartUser.state = cartState
        
        session.add(cartUser)
        session.commit()
        
        date = datetime.now()
        newDate = format_datetime(date, locale='es_ES')
        
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
            newOrden.items.append(newOrdenItem)
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
            
                
        
    