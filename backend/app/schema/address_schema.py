from typing import Optional
from pydantic import BaseModel

class AddressSchema(BaseModel):
    id:Optional[int] = None
    id_user:Optional[int] = None
    street:str
    city:str
    state:str
    postal_code:str
    country:str
    
class AddressReponse(BaseModel):
    id:int
    id_user:int
    street:str
    city:str
    state:str
    postal_code:str
    country:str
