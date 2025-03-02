from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional
from models.cart import Cart
from models.product import Product

class CartItemSchema(BaseModel):
    id: Optional[int] = None
    id_cart: Optional[int] = None
    id_product: int
    quantity:int
    unityPrice:float

class CartItemSchema(BaseModel):
    id: Optional[int] = None
    id_cart: Optional[int] = None
    id_product: int
    quantity:int
    unityPrice:float
    
    cart:Cart
    product:Product
