from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional

class CartItemSchema(BaseModel):
    id: Optional[int] = None
    id_cart: int
    id_product: int
    quantity:int
    unityPrice:float