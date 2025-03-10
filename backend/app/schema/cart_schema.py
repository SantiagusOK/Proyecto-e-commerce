from pydantic import BaseModel
from typing import Optional
from schema.cart_state import CartStateResponse
from schema.cart_item_schema import CartItemResponse


class CartSchema(BaseModel):
    id:Optional[int] = None
    state_id: Optional[int] = None
    createdAt:Optional[str] = None
    totalCart: Optional[float] = None
    id_user:int

class CartResponse(BaseModel):
    id:int
    state_id: int
    createdAt:str
    totalCart: float
    id_user:int
    
    state:CartStateResponse
    cart_items:list[CartItemResponse]
