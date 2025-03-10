import { useQuery } from "@tanstack/react-query"
import { OrderData } from "../type/orderData"
import { fetchAnOrder, fetchOrdersUser } from "../api/orderApi"


export const useOrdersUser = (id_user:number) =>{
    return useQuery<OrderData[], Error>({
        queryKey: ["orders", id_user],
        queryFn:()=>fetchOrdersUser(id_user),
        retry:false
    })
} 

export const useOrder = (id_product:number) => {
    return useQuery<OrderData, Error>({
        queryKey:["order",id_product],
        queryFn:() => fetchAnOrder(id_product),
    })
}