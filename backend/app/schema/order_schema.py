from pydantic import BaseModel
from typing import Optional

class OrderSchema(BaseModel):
    id: Optional[int] = None
    id_user: int
    date: str
    totalOrder: float
    address:str
