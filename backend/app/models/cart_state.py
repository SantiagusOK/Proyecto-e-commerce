
from typing import TYPE_CHECKING, Optional
from sqlmodel import  Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.cart import Cart

class CartState(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    
    cartsStatus: Optional[list["Cart"]] = Relationship(back_populates="status")