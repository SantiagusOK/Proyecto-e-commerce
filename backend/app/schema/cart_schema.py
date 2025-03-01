from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional

class CartSchema(BaseModel):
    id:Optional[int] = None
    state_id: Optional[int] = None
    createdAt:Optional[str] = None
    total: Optional[float] = None
    id_user:int