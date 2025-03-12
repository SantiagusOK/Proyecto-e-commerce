from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

if TYPE_CHECKING:
    from models.category import Category
    from models.cart import Cart
    from models.cart import CartItem
    from models.address import Address
    from models.order_item import OrderItem

class Product(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    price:float
    id_category:Optional[int] = Field(default=None, foreign_key="category.id")
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int
    urlImage: str
    
    category:Optional["Category"] = Relationship(back_populates="products")
    cart_item:Optional[list["CartItem"]] = Relationship(back_populates="product")
    orderItem:Optional[list["OrderItem"]] = Relationship(back_populates="product")
