from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional

from models.cart_state import CartState
from models.cart_item import CartItem

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
    
    state:CartState
    cart_items:list["CartItem"]