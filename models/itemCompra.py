from pydantic import BaseModel
from typing import Optional
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field
from models.itemCarrito import ItemCarritoModel

class ItemCompraModel(BaseModel):
    id:Optional[int] = None
    id_user:int
    comprasList:Optional[list[ItemCarritoModel]] = []
    fechaDeCompra:str

class ItemCompras(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_user:int = Field(default=None, foreign_key="users.id")
    comprasList:Optional[list[ItemCarritoModel]] = Field(default=None,sa_column=Column(JSON))
    fechaDeCompra:str
