from typing import Optional
from pydantic import BaseModel

class CategorySchema(BaseModel):
    id:Optional[int] = None
    name:str
    description:str
