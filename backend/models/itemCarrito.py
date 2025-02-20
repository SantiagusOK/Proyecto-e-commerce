from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.products import Products

class ItemCarritoModel(BaseModel):
    id_item_carrito:Optional[int] = None
    id_usuario:int
    id_product: int 
    total: float
    cantidad: int
    eliminado:Optional[bool] = False


class ItemCarrito(SQLModel, table=True):
    id_item_carrito:Optional[int] = Field(default=None, primary_key=True)
    id_usuario: int = Field(default=None, foreign_key="users.idUser")
    id_product: int = Field(default=None, foreign_key="products.idProduct")
    total: float
    cantidad: int
    eliminado:Optional[bool] = False
    
    productoItem:Optional["Products"] = Relationship(back_populates="itemCarrito")
    
class ItemCarritoUpdate(BaseModel):
    total: float
    cantidad: int
    stockProduct:int