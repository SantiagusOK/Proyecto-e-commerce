from typing import List, TYPE_CHECKING, Optional
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from backend.models.product import Product
    
class CategoryModel(BaseModel):
    id:Optional[int] = None
    name:str

class Category(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    products: List["Product"] = Relationship(back_populates="category")