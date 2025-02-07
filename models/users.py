from pydantic import BaseModel
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from models.itemCarrito import ItemCarritoModel
from models.itemCompra import ItemCompraModel


class Users(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    direccion:str
    carrito_items: Optional[list[ItemCarritoModel]] = Field(default=None,sa_column=Column(JSON))
    compras_lista: Optional[list[ItemCompraModel]] = Field(default=None,sa_column=Column(JSON))


class UsersModel(BaseModel):
    id:Optional[int] = None
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    direccion:str
    carrito_items: Optional[list[ItemCarritoModel]] = []
    compras_lista: Optional[list[ItemCompraModel]] = []


class UsersLoginModel(BaseModel):
    username:str
    password:str