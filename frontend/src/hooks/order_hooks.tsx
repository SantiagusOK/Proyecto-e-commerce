import { useMutation, useQuery } from "@tanstack/react-query"
import { OrderData } from "../type/orderData"
import { createOrderUser,fetchOrder, fetchOrders } from "../api/orderApi"


export const useOrdersUser = (id_user:number) =>{
    return useQuery<OrderData[], Error>({
        queryKey: ["orders", id_user],
        queryFn:() => fetchOrders(id_user),
        retry:false
    })
} 

export const useOrder = (id_product:number) => {
    return useQuery<OrderData, Error>({
        queryKey:["order",id_product],
        queryFn:() => fetchOrder(id_product),
    })
}

export const userCreateOrder = () => {
    return useMutation({
        mutationFn: createOrderUser
    })
}