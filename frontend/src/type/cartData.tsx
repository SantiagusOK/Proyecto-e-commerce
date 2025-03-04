import { CartItemData } from "./cartItemData"
import { StateData } from "./stateData"

export interface CartData{
    id:number,
    id_user:number,
    state_id:number,
    totalCart:number,
    createdAt:string,

    state:StateData,
    cart_items:CartItemData[]
}