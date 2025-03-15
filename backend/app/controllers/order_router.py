from fastapi import APIRouter,status, Depends
from db.connect import get_session
from sqlmodel import Session
from services.order_service import OrderServices
from schema.order_schema import OrderResponse

router = APIRouter(prefix="/order", tags=["Order"])

@router.get("/", response_model=list[OrderResponse])
async def get_all_order(session:Session=Depends(get_session)):
    return OrderServices.get_all_orders(session)

@router.get("/{id_order}", response_model=OrderResponse)
async def get_order(id_order:int, session:Session=Depends(get_session)):
    return OrderServices.get_order(session, id_order)

@router.get("/getOrdersUser/{id_user}", response_model=list[OrderResponse])
async def get_all_orders_user(id_user:int, session:Session=Depends(get_session)):
    return OrderServices.get_all_orders_user(session,id_user)

@router.put("/updateState/{id_order}/{id_state}", status_code=status.HTTP_200_OK)
async def finish_order(id_order:int, id_state:int,session:Session=Depends(get_session)):
    return OrderServices.update_state(session, id_order, id_state)

@router.post("/createOrder/{id_user}", status_code=status.HTTP_201_CREATED)
async def create_order(id_user:int, session:Session=Depends(get_session)):
    return OrderServices.create_order(session, id_user)