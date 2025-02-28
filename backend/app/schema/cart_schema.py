from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional

class CartSchema(BaseModel):
    id:Optional[int] = None
    id_user:int
    state_id: int
    total: float

class CartUpdateSchema(BaseModel):
    total: float
    stockProduct:int