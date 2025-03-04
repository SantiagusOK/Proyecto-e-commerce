from collections import defaultdict
from datetime import datetime
import locale
from fastapi import APIRouter, HTTPException, status, Depends
from db.connect import get_session
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from models.product import Product
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
from schema.cart_response import CartResponse

from services.cart_service import CartService

locale.setlocale(locale.LC_TIME, "es_ES") 

router = APIRouter(tags=["Cart"], prefix="/cart")

@router.get("/",response_model=list[Cart], status_code=status.HTTP_200_OK)
async def get_all_cart(sessio:Session=Depends(get_session)):
    return CartService.get_all_cart(sessio)

@router.get("/createCart/{id_user}", status_code=status.HTTP_201_CREATED)
async def create_cart(id_user:int, session:Session = Depends(get_session)):
    return CartService.create_cart(session,id_user)

@router.put("/saveItemInCart/{id_user}", status_code=status.HTTP_200_OK)
async def save_item_in_cart(id_user:int, anItem:CartItemSchema, session:Session = Depends(get_session)):
    return CartService.save_item_in_cart(session, id_user, anItem)
    
@router.get("/getCart/{id}", response_model=CartResponse,status_code=status.HTTP_200_OK)
async def get_cart(id:int, session:Session = Depends(get_session)):
    return CartService.get_cart(session, id)
    
@router.get("/getItemCart/{id}/{id_cart}", response_model=CartItemSchemaResponse, status_code=status.HTTP_200_OK)
async def get_item_cart(id:int, id_cart:int, session:Session = Depends(get_session)):
    return CartService.get_item_cart(session, id, id_cart)

@router.put("/modifyAnItemCart/{id_item}", status_code=status.HTTP_200_OK)
async def modify_item_cart(id_item:int,itemCartUpdate:CartItemUpdateSchema ,session:Session = Depends(get_session)):
    return CartService.modify_item_cart(session, id_item, itemCartUpdate)
          
@router.put("/deleteItemCart/{id_item}",status_code=status.HTTP_200_OK)
async def delete_a_item_from_cart(id_item:int, session:Session = Depends(get_session)):
    return CartService.delete_a_item_from_cart(session, id_item)

    
    
