from datetime import datetime
import locale
from fastapi import APIRouter, HTTPException, status, Depends
from db.connect import get_session
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from models.user import User
from models.cart import Cart
from models.cart_state import CartState
from models.order import *
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

from services.order_service import OrderServices

locale.setlocale(locale.LC_TIME, "es_ES") 

router = APIRouter(prefix="/order", tags=["Order"])

@router.get("/", response_model=list[OrderResponse])
async def get_all_order(session:Session=Depends(get_session)):
    return OrderServices.get_all_order(session)

@router.put("/setOrderState/{id_order}/{id_state}", status_code=status.HTTP_200_OK)
async def set_order_state(id_order:int, id_state:int, session:Session=Depends(get_session)):
    return OrderServices.set_order_state(id_order, id_state,session)

@router.get("/getOrder/{id_order}", response_model=OrderResponse)
async def get_order(id_order:int, session:Session=Depends(get_session)):
    return OrderServices.get_order(session, id_order)

@router.post("/createOrder/{id_user}", status_code=status.HTTP_201_CREATED)
async def create_order(id_user:int, session:Session=Depends(get_session)):
    return OrderServices.create_order(session, id_user)