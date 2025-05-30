from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.product import Product
    from models.cart import Cart
    
class CartItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_cart: int = Field(default=None, foreign_key="cart.id")
    id_product: int = Field(default=None, foreign_key="product.id")
    quantity:int
    unityPrice:float
    
    cart:Optional["Cart"] = Relationship(back_populates="cart_items")
    product: Optional["Product"] = Relationship(back_populates="cart_item")