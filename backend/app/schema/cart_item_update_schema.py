from pydantic import BaseModel


class CartItemUpdateSchema(BaseModel):
    stockCurrent:int
    quantity:int
    unityPrice:float