from typing import Optional
from pydantic import BaseModel
from models.product import Product

class CategorySchema(BaseModel):
    id:int
    name:str
    description:str


    