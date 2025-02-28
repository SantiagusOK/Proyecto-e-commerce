from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

if TYPE_CHECKING:
    from models.product import Product

class PriceChangeHistory(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    newPrice:int
    date:str
    product_id:Optional[int] = Field(default=None, foreign_key="product.id")
    
    product:Optional["Product"] = Relationship(back_populates="priceHistory")
    