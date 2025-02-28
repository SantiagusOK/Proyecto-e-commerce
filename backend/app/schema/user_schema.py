from pydantic import BaseModel
from typing import  Optional

class UserModelSchema(BaseModel):
    id:Optional[int] = None
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    id_address:int

class UserLoginModelSchema(BaseModel):
    username:str
    password:str
    
class UserAdminModelSchema(BaseModel):
    roleName:str