from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

from models.categories import Categories

if TYPE_CHECKING:
    from models.categories import Categories
    from models.itemCarrito import ItemCarrito

class ProductModel(BaseModel):
    idProduct:Optional[int] = None
    name:str
    stock:int
    price:float
    categories:Optional[int] = None

class Products(SQLModel, table=True):
    idProduct:Optional[int] = Field(default=None, primary_key=True)
    name:str
    stock:int
    price:float
    categories:Optional[int] = Field(default=None, foreign_key="categories.id")

    category:Optional[Categories] = Relationship(back_populates="products")
    itemCarrito:List["ItemCarrito"] = Relationship(back_populates="productoItem")

class ProducstSearchModel(BaseModel):
    name:str
    categorie:int

class ProductUpdateModel(BaseModel):
    idProduct:int
    price:float
    stock:int