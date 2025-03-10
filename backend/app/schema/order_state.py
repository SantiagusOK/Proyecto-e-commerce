from pydantic import BaseModel
from schema.order_schema import OrderResponse
from schema.order_state_history import OrderStateHistoryResponse

class OrderStateReponse(BaseModel):
    id:int
    name:str
    
    order:list["OrderResponse"]
    stateList:list["OrderStateHistoryResponse"]
    