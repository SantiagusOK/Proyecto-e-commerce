from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

if TYPE_CHECKING:
    from models.category import Category
    from models.cart import Cart
    from models.cart import CartItem
    from models.price_change_history import PriceChangeHistory
    from models.address import Address

class ProdutCategoryLink(SQLModel, table=True):
    id_product:Optional[int] = Field(default= None, primary_key=True, foreign_key="product.id")
    id_category:Optional[int] = Field(default= None, primary_key=True, foreign_key="category.id")


