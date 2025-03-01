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
from models.order import Order
from models.order_item import OrderItem
from models.order_state import OrderState
from models.order_state_history import OrderStateHistory

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

router = APIRouter(prefix="/order", tags=["Order"])

@router.get("/")
async def get_all_order(session:Session=Depends(get_session)):
    orderStatement = (select(Order))
    allOrders = session.exec(orderStatement).all()
    
    if not allOrders:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay ordenes de compra disponibles"
        )
        
    return allOrders

@router.put("/setOrderState/{id_order}/{id_state}")
async def set_order_state(id_order:int, id_state:int, session:Session=Depends(get_session)):
    orderStateStatement = (select(OrderState)
                           .where(OrderState.id == id_state))
    orderStatement = (select(Order)
                           .where(Order.id == id_order))
    
    order = session.exec(orderStatement).first()
    orderState = session.exec(orderStateStatement).first()
    
    userStatement = (select(User)
                           .where(User.id == order.id_user))
    user = session.exec(userStatement).first()
    
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
    
    raise HTTPException(
        status_code=status.HTTP_202_ACCEPTED,
        detail="Estado de la orden actualizada con exito"
    )

@router.get("/getOrder/{id_order}")
async def get_order(id_order:int, session:Session=Depends(get_session)):
    orderStatement = (select(Order)
                      .where(Order.id == id_order))
    order = session.exec(orderStatement).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontro la orden"
        )
    
    order_response = {
        "id":order.id,
        "id_user":order.id_user,
        "date":order.date,
        "totalOrder":order.totalOrder,
        "id_state":order.id_state,
        "state":order.state,
        "address":order.address,
        "orders":order.orders,
    }
    
    return order_response

@router.post("/createOrder/{id_user}")
async def create_order(id_user:int, session:Session=Depends(get_session)):
    
    
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
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail="Orden creada con exito"
    )
    