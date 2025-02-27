from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.product import Product
    from models.cartItem import CartItem
    from models.cartState import CartState
    
class Cart(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_user: int = Field(default=None, foreign_key="user.id")
    state_id: int = Field(default=None, foreign_key="cartstate.id")
    totalCart: float
    
    state:Optional["CartState"] = Relationship(back_populates="cartsStatus")
    cart_items: list["CartItem"] = Relationship(back_populates="carts")

class CartModel(BaseModel):
    id:Optional[int] = None
    id_user:int
    state_id: int
    total: float

class CartUpdate(BaseModel):
    total: float
    stockProduct:int