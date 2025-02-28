from typing import TYPE_CHECKING, Optional
from pydantic import BaseModel, Field
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from models.user import User
    
class Role(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    roleName:str
    
    users:Optional[list["User"]] = Relationship(back_populates="role")