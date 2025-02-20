from pydantic import BaseModel
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field, Relationship
from models.itemCarrito import ItemCarritoModel
# from models.itemProductCompra import ItemProductCompra

if TYPE_CHECKING:
    from models.itemProductCompra import ItemProductCompra  # Import diferido solo para anotaciones

class ItemCompraModel(BaseModel):
    idCompra: Optional[int] = None
    id_user: int
    fechaDeCompra: str
    totalCompra: float

class ItemCompra(SQLModel, table=True):
    idCompra: Optional[int] = Field(default=None, primary_key=True)
    id_user: int = Field(default=None, foreign_key="users.idUser")
    fechaDeCompra: str
    totalCompra: float
    
    # Relación diferida con ItemProductCompra
    productList: List["ItemProductCompra"] = Relationship(back_populates="itemCompra")