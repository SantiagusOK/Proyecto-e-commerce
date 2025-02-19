from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional

class ItemProductCompraModel(BaseModel):
    id:Optional[int] = None
    id_compra:Optional[int] = None
    id_product:Optional[int] = None
    cantidad:int
    total_por_cantidad:int

class ItemProductCompra(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_compra:Optional[int] = Field(default=None, foreign_key="itemcompra.idCompra")
    id_product:Optional[int] = Field(default=None, foreign_key="products.idProduct")
    cantidad:int
    total_por_cantidad:int
    