from pydantic import BaseModel
from typing import Optional
from schema.product_schema import ProductResponse
    
class CartItemSchema(BaseModel):
    id: Optional[int] = None
    id_cart: Optional[int] = None
    id_product: int
    quantity:int
    unityPrice:float

class BasicCartItemResponse(BaseModel):
    id: int
    id_cart: int 
    id_product: int 
    quantity:int
    unityPrice:float
    
    product: ProductResponse
    
class CartItemResponse(BaseModel):
    id: Optional[int] = None
    id_cart: Optional[int] = None
    id_product: int
    quantity:int
    unityPrice:float
    product:ProductResponse
    
class CartItemUpdateSchema(BaseModel):
    quantity:int
    unityPrice:float

