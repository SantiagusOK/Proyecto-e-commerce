from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from typing import Optional

class ProductModel(BaseModel):
    id:Optional[int] = None
    name:str
    stock:int
    price:float
    categories:Optional[int] = None

class Products(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str
    stock:int
    price:float
    categories:Optional[int] = Field(default=None, foreign_key="products.id")