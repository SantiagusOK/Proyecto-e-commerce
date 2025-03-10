import { AddressData } from "./addressData";
import { OrderItemData } from "./orderItemData";
import { OrderStateData } from "./orderStateData";
import { UserData } from "./userData";

export interface OrderData{
    id:number,
    id_user:number,
    id_address:number,
    date:string,
    totalOrder:number,
    address:AddressData,
    state:OrderStateData,
    items:OrderItemData[]
    user:UserData
}