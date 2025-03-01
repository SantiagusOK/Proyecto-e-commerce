from typing import TYPE_CHECKING, Optional
from sqlmodel import Relationship, SQLModel, Field
from sqlalchemy.orm import remote

if TYPE_CHECKING:
    from models.user import User
    from models.order import Order


class Address(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    id_user:Optional[int] = Field(default=None, foreign_key="user.id")
    street:str
    city:str
    state:str
    postal_code:str
    country:str
    
    user:Optional["User"] = Relationship(back_populates="address")
    orderlist: Optional[list["Order"]] = Relationship(back_populates="address")