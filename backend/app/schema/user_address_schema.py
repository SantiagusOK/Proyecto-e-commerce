from pydantic import BaseModel
from schema.user_schema import *
from schema.address_schema import * 

class UsersAddressSchema(BaseModel):
    user:UserModelSchema
    address:AddressSchema