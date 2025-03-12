from pydantic import BaseModel
from typing import Optional
from schema.category_schema import CategoryResponse, CategorySchema

class ProductSchema(BaseModel):
    id:Optional[int] = None
    name:str
    price:float
    id_category:Optional[int] = None
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int
    urlImage:str

class ProductResponse(BaseModel):
    id:int
    name:str
    price:float
    id_category:int
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int
    urlImage:str
    
    category:CategoryResponse

class ProductUpdateSchema(BaseModel):
    id:int
    price:float
    stockCurrent:int
    description:str
    stockMax:int

class ProductCreateSchema(BaseModel):
    product:ProductSchema
    category:CategorySchema
    

