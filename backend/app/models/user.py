from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional
from sqlalchemy.orm import remote

if TYPE_CHECKING:
    from models.role import Role
    from models.address import Address
    from models.order_state_history import OrderStateHistory
    from models.order import Order

class User(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    fullname:str
    lastname:str
    username:str
    password:str
    email:str
    birthdate:str
    role_id:Optional[int] = Field(default=None, foreign_key="role.id")
    
    role:Optional["Role"] = Relationship(back_populates="users")
    address:Optional["Address"] = Relationship(back_populates="user")
    orderStateHistory:Optional[list["OrderStateHistory"]] = Relationship(back_populates="user")
    orders:Optional[list["Order"]] = Relationship(back_populates="user")