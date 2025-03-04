from pydantic import BaseModel

class ProductUpdateModelSchema(BaseModel):
    id:int
    price:float
    stockCurrent:int
    description:str
    stockMax:int