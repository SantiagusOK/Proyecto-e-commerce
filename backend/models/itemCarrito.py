from pydantic import BaseModel
from typing import Optional
from sqlmodel import SQLModel, Field

class ItemCarritoModel(BaseModel):
    id_item_carrito:Optional[int] = None
    id_usuario:Optional[int] = None
    id_product: int 
    total: float
    cantidad: int

class ItemCarrito(SQLModel, table=True):
    id_item_carrito:Optional[int] = Field(default=None, primary_key=True)
    id_usuario: int = Field(default=None, foreign_key="users.id")
    id_product: int 
    total: float
    cantidad: int