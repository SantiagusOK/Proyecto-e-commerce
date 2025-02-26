from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

from models.cart import Cart

if TYPE_CHECKING:
    from models.cart import Cart
    from models.order import Order

class State(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    
    cart:Optional[list[Cart]] = Relationship(back_populates="state")
    order:Optional[list["Order"]] = Relationship(back_populates="state")

    
class StateModel(BaseModel):
    name:str