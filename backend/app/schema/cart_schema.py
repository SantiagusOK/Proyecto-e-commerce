from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional

from models.cart_state import CartState
from schema.cart_item_response import CartItemResponse


class CartSchema(BaseModel):
    id:Optional[int] = None
    state_id: Optional[int] = None
    createdAt:Optional[str] = None
    totalCart: Optional[float] = None
    id_user:int

