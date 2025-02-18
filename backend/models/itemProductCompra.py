from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional

class ItemProductCompraModel(BaseModel):
    id:Optional[int] = None
    id_compra:Optional[int] = None
    cantidad:int
    total_por_cantidad:int

class ItemProductCompra(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_compra:int = Field(default=None, foreign_key="ItemCompra.id")
    cantidad:int
    total_por_cantidad:int    