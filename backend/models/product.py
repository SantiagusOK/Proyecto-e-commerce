from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

if TYPE_CHECKING:
    from models.category import Category
    from models.cart import Cart
    from models.PriceChangeHistory import PriceChangeHistory
    from models.address import Address

class Product(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    stock:int
    price:float
    categories:Optional[int] = Field(default=None, foreign_key="category.id")
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int
    id_address:Optional[int] = Field(default=None, foreign_key="address.id")
    
    category:Optional["Category"] = Relationship(back_populates="products")
    cart:List["Cart"] = Relationship(back_populates="product")
    priceHistory:Optional[list["PriceChangeHistory"]] = Relationship(back_populates="product")
    address:Optional["Address"] = Relationship(back_populates="users")

class ProductModel(BaseModel):
    id:Optional[int] = None
    name:str
    stock:int
    price:float
    categories:Optional[int] = None
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int


class ProductSearchModel(BaseModel):
    name:str
    categorie:int

class ProductUpdateModel(BaseModel):
    id:int
    price:float
    stockCurrent:int