from pydantic import BaseModel
from typing import Optional

from models.category import Category
from models.cart_item import CartItem
from models.order_item import OrderItem

class ProductModelSchema(BaseModel):
    id:Optional[int] = None
    name:str
    price:float
    categories:Optional[int] = None
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int

class ProductSearchModelSchema(BaseModel):
    name:str
    id_category:int

class ProductUpdateModelSchema(BaseModel):
    id:int
    price:float
    stockCurrent:int
    description:str
    stockMax:int

class ProductResponse(BaseModel):
    id:int
    name:str
    price:float
    id_category:int
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int
    
    category:Category
