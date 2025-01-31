from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Users(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    
class UsersModel(BaseModel):
    id:Optional[int] = None
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str