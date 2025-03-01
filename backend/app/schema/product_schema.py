from pydantic import BaseModel
from typing import Optional

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