from pydantic import BaseModel
from schema.product_response import ProductResponse

class CartItemResponse(BaseModel):
    id: int
    id_cart: int 
    id_product: int 
    quantity:int
    unityPrice:float
    
    product: ProductResponse