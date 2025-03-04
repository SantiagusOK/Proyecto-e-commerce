from typing import Optional
from pydantic import BaseModel

class RoleResponse(BaseModel):
    id:int
    roleName:str



class AddressReponse(BaseModel):
    id:int
    id_user:int
    street:str
    city:str
    state:str
    postal_code:str
    country:str

    
class UserResponse(BaseModel):
    id:int
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    role_id:int
    role:RoleResponse
    address:AddressReponse
 
