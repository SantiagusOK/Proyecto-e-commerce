from pydantic import BaseModel
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from models.order_item import OrderItem
    from models.order_state import OrderState
    from models.order_state_history import OrderStateHistory
    from models.address import Address

class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_user: int = Field(default=None, foreign_key="user.id")
    date: str
    totalOrder: float
    id_address:Optional[int] = Field(default=None, foreign_key="address.id")
    id_state: int = Field(default=None, foreign_key="orderstate.id")
    # id_ordersHistory:Optional[int] = Field(default=None, foreign_key="orderStateHistory.id")
    
    state:Optional["OrderState"] = Relationship(back_populates="order")
    orders: List["OrderItem"] = Relationship(back_populates="order")
    ordersHistory: List["OrderStateHistory"] = Relationship(back_populates="order")
    address:Optional["Address"] = Relationship(back_populates="orderlist")