from pydantic import BaseModel
from typing import Optional

from models.category import *
from models.cart_item import CartItem
from models.order_item import OrderItem

class ProductModelSchema(BaseModel):
    id:Optional[int] = None
    name:str
    price:float
    id_category:Optional[int] = None
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int
    

