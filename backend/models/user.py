from pydantic import BaseModel
from sqlalchemy import JSON, Column
from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional, List
from datetime import datetime
from models.cart import Cart

if TYPE_CHECKING:
    from models.role import Role
    

class User(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    address:str
    role_id:Optional[int] = Field(default=None, foreign_key="role.id")
    
    role:Optional["Role"] = Relationship(back_populates="users")


class UserModel(BaseModel):
    id:Optional[int] = None
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    address:str

class UserLoginModel(BaseModel):
    username:str
    password:str
    
class UserAdminModel(BaseModel):
    roleName:str