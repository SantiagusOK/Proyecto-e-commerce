import { ProductData } from "./productData";

export interface OrderItemData{
    id:number,
    id_order:number,
    id_product:number,
    amountTotal:number,
    amount:number,
    product:ProductData
}