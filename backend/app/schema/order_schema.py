from pydantic import BaseModel
from typing import Optional

from models.order_state import OrderState
from models.address import Address
from schema.order_item_schema import OrderItemResponse
from models.order_state_history import OrderStateHistory
from schema.user_schema import UserResponse

class OrderSchema(BaseModel):
    id: Optional[int] = None
    id_user: int
    id_address:str
    date: str
    totalOrder: float
    address:str

class OrderResponse(BaseModel):
    id:int
    id_user:int
    id_address:int
    date:str
    totalOrder:float
    
    user:UserResponse
    address:Address
    state:OrderState
    items:list["OrderItemResponse"]
