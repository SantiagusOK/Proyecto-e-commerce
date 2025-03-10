from pydantic import BaseModel

class BasicRoleResponse(BaseModel):
    id:int
    roleName:str