from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

from models.cart import Cart

if TYPE_CHECKING:
    from models.cart import Cart
    from models.order import Order
    from models.order_state_history import OrderStateHistory

class OrderState(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    
    order:Optional[list["Order"]] = Relationship(back_populates="state")
    ordersState:Optional[list["OrderStateHistory"]] = Relationship(back_populates="orderState")
    