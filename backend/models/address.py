from typing import TYPE_CHECKING, Optional
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.user import User


class Address(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_user:int = Field(default=None, foreign_key="user.id")
    street:str
    city:str
    state:str
    postal_code:str
    country:str
    
    users:Optional[list["User"]] = Relationship(back_populates="adress")