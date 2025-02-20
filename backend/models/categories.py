from typing import List, TYPE_CHECKING, Optional
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from models.products import Products
    
class CategorieModel(BaseModel):
    id:Optional[int] = None
    name:str

class Categories(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    products: List["Products"] = Relationship(back_populates="category")