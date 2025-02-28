from typing import TYPE_CHECKING, Optional
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.cart_item import CartItem
    from models.cart_state import CartState
    
class Cart(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_user: int = Field(default=None, foreign_key="user.id")
    state_id: int = Field(default=None, foreign_key="cartstate.id")
    totalCart: float
    
    state:Optional["CartState"] = Relationship(back_populates="cartsStatus")
    cart_items: list["CartItem"] = Relationship(back_populates="carts")