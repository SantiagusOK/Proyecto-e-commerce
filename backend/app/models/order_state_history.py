from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

if TYPE_CHECKING:
    from models.user import User
    from models.order import Order
    from models.order_state import OrderState

class OrderStateHistory(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_user: Optional[int] = Field(default=None, foreign_key="user.id")
    id_order: Optional[int] = Field(default=None, foreign_key="order.id")
    id_orderState:Optional[int] = Field(default=None, foreign_key="orderstate.id")
    changeAt: str
    
    order:Optional["Order"] = Relationship(back_populates="ordersHistory")
    state:Optional["OrderState"] = Relationship(back_populates="stateList")
    user:Optional["User"] = Relationship(back_populates="orderStateHistory")