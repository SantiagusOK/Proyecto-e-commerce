from pydantic import BaseModel
from typing import  Optional
from models.role import Role
from models.address import Address
from models.order_state_history import OrderStateHistory

class UserModelSchema(BaseModel):
    id:Optional[int] = None
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str

class UserLoginModelSchema(BaseModel):
    username:str
    password:str
    
class UserAdminModelSchema(BaseModel):
    roleName:str

class UserResponse(BaseModel):
    id:int
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    role_id:int
    
    role:Role
    address:Address
