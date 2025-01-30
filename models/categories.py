from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from typing import Optional

class CategorieModel(BaseModel):
    id:Optional[int] = None
    name:str

class Categories(SQLModel, table=True):
    id:Optional[int] = Field(default=None, primary_key=True)
    name:str