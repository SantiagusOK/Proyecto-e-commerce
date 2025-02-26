from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from backend.models.order import Order

class OrderItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_order:Optional[int] = Field(default=None, foreign_key="order.id")
    id_product:Optional[int] = Field(default=None, foreign_key="product.id")
    amountTotal:int
    amount:int

    order: Optional["Order"] = Relationship(back_populates="orders")

class OrderItemModel(BaseModel):
    id:Optional[int] = None
    id_order:Optional[int] = None
    id_product:Optional[int] = None
    amountTotal:int
    amount:int

