from pydantic import BaseModel
from typing import Optional
from sqlmodel import SQLModel, Field

class ItemCarritoModel(BaseModel):
    id:Optional[int] = None
    id_product: int 
    total: float
    amount: int