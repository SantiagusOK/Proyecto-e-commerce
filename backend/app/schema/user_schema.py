from pydantic import BaseModel
from typing import Optional
from schema.address_schema import AddressReponse, AddressSchema
from schema.role_user_response import BasicRoleResponse

class UserSchema(BaseModel):
    id:Optional[int] = None
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str

class UserResponse(BaseModel):
    id:int
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    role_id:int
    role:Optional["BasicRoleResponse"]
    address:AddressReponse
    
class UserRegisterSchema(BaseModel):
    user:UserSchema
    address:AddressSchema  

class UserLoginSchema(BaseModel):
    username:str
    password:str