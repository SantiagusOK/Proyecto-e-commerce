from pydantic import BaseModel
from typing import Optional
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field
from models.itemCarrito import ItemCarritoModel

class ItemCompraModel(BaseModel):
    idCompra:Optional[int] = None
    id_user:int
    fechaDeCompra:str
    totalCompra:float

class ItemCompra(SQLModel, table=True):
    idCompra:Optional[int] = Field(default=None, primary_key=True)
    id_user:int = Field(default=None, foreign_key="users.idUser")
    fechaDeCompra:str
    totalCompra:float
