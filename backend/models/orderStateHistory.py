from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

from models.cart import Cart

if TYPE_CHECKING:
    from models.user import User
    from models.order import Order
    from models.orderState import OrderState

class OrderStateHistory(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_order:int
    id_orderState: int
    id_user: int
    changeAt: str
    
    order:Optional["Order"] = Relationship(back_populates="ordersHistory")
    orderState:Optional["OrderState"] = Relationship(back_populates="ordersState")
    user:Optional["User"] = Relationship(back_populates="orderStateHistory")