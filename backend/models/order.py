from pydantic import BaseModel
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from models.orderItem import OrderItem
    from models.orderState import OrderState
    from models.orderStateHistory import OrderStateHistory

class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_user: int = Field(default=None, foreign_key="user.id")
    date: str
    totalOrder: float
    address:str
    state_id: int = Field(default=None, foreign_key="orderstate.id")
    
    state:Optional["OrderState"] = Relationship(back_populates="order")
    orders: List["OrderItem"] = Relationship(back_populates="order")
    ordersHistory: List["OrderStateHistory"] = Relationship(back_populates="order")
    
class OrderModel(BaseModel):
    id: Optional[int] = None
    id_user: int
    date: str
    totalOrder: float
    address:str
