from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.product import Product
    from models.state import State
    
class Cart(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_user: int = Field(default=None, foreign_key="user.id")
    id_product: int = Field(default=None, foreign_key="product.id")
    total: float
    amount: int
    state_id: int = Field(default=None, foreign_key="state.id")
    
    product:Optional["Product"] = Relationship(back_populates="cart")
    state:Optional["State"] = Relationship(back_populates="cart")

class CartModel(BaseModel):
    id:Optional[int] = None
    id_user:int
    id_product: int 
    total: float
    amount: int

class CartUpdate(BaseModel):
    total: float
    amount: int
    stockProduct:int