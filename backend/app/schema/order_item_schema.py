from pydantic import BaseModel
from typing import Optional
from typing import Optional
from schema.product_schema import ProductResponse

class OrderItemSchema(BaseModel):
    id:Optional[int] = None
    id_order:Optional[int] = None
    id_product:Optional[int] = None
    amountTotal:float
    amount:int

class OrderItemResponse(BaseModel):
    id:int
    id_order:int
    id_product:int
    amountTotal:float
    amount:int
    product:ProductResponse


