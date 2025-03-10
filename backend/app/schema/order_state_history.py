from pydantic import BaseModel
from schema.user_schema import UserResponse
from schema.order_state import OrderStateResponse
from schema.order_schema import OrderResponse


class OrderStateHistoryResponse(BaseModel):
    id:int
    id_user: int
    id_order: int
    id_orderState:int
    changeAt: str
    
    order:OrderResponse
    state:OrderState
    user:UserResponse

