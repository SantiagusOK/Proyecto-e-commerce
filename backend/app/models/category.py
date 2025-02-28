from typing import List, TYPE_CHECKING, Optional
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from models.product import Product
    
class Category(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    description:str
    
    products: List["Product"] = Relationship(back_populates="category")