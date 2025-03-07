from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from models.order import Order
    from models.product import Product

class OrderItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_order:Optional[int] = Field(default=None, foreign_key="order.id")
    id_product:Optional[int] = Field(default=None, foreign_key="product.id")
    amountTotal:int
    amount:int

    order: Optional["Order"] = Relationship(back_populates="items")
    product: Optional["Product"] = Relationship(back_populates="orderItem")

