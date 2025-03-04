from pydantic import BaseModel
from schema.category_response import  CategoryResponse

class ProductResponse(BaseModel):
    id:int
    name:str
    price:float
    id_category:int
    description:str
    stockMin:int
    stockMax:int
    stockCurrent:int
    
    category:CategoryResponse