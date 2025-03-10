from typing import List, Optional
from pydantic import BaseModel
from schema.user_schema import UserResponse

class RoleSchema(BaseModel):
    id:Optional[int] = None
    roleName:str
    
class RoleResponse(BaseModel):
    id:int
    roleName:str
    # users:List["UserResponse"]


