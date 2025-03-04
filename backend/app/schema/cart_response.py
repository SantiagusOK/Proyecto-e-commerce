from pydantic import BaseModel
from schema.cart_item_response import CartItemResponse
from schema.cart_state_response import CartStateResponse



class CartResponse(BaseModel):
    id:int
    state_id: int
    createdAt:str
    totalCart: float
    id_user:int
    
    state:CartStateResponse
    cart_items:list["CartItemResponse"]