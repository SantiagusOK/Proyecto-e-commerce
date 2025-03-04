from pydantic import BaseModel


class CartStateResponse(BaseModel):
    id:int
    name:str