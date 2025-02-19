from pydantic import BaseModel
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from models.itemCarrito import ItemCarritoModel
from models.itemCompra import ItemCompraModel


class Users(SQLModel, table=True):
    idUser:Optional[int] = Field(default=None, primary_key=True)
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    direccion:str
    isAdmin:Optional[bool] = False


class UsersModel(BaseModel):
    idUser:Optional[int] = None
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    direccion:str
    isAdmin:Optional[bool] = False


class UsersLoginModel(BaseModel):
    username:str
    password:str
    
class UsersAdminModel(BaseModel):
    isAdmin:bool