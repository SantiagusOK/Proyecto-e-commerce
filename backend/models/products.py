from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from models.categories import Categories

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
    categories:Optional[int] = Field(default=None, foreign_key="categories.id")

class ProducstSearchModel(BaseModel):
    name:str
    categorie:int

class ProductUpdateModel(BaseModel):
    id:int
    price:float
    stock:int