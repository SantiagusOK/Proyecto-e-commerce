from pydantic import BaseModel
from typing import Optional
from typing import Optional

class OrderItemSchema(BaseModel):
    id:Optional[int] = None
    id_order:Optional[int] = None
    id_product:Optional[int] = None
    amountTotal:int
    amount:int

