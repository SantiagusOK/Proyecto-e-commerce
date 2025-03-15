import { useMutation, useQuery } from "@tanstack/react-query"
import { OrderData } from "../type/orderData"
import { createOrderUser,fetchOrder, fetchOrders, fetchOrdersUser, updateOrderState } from "../api/orderApi"


export const useOrdersUser = (id_user:number) =>{
    return useQuery<OrderData[], Error>({
        queryKey: ["orders", id_user],
        queryFn:() => fetchOrdersUser(id_user),
        retry:false
    })
}

export const useOrder = (id_product:number) => {
    return useQuery<OrderData, Error>({
        queryKey:["order",id_product],
        queryFn:() => fetchOrder(id_product),
    })
}

export const useOrders = () => {
    return useQuery<OrderData[], Error>({
        queryKey:["orders"],
        queryFn:fetchOrders,
    })
}

export const userCreateOrder = () => {
    return useMutation({
        mutationFn: createOrderUser
    })
}

export const useUpdateOrderState = () => {
    return useMutation({
        mutationFn: (data:{id_order:number, id_state:number}) => updateOrderState(data.id_order, data.id_state)
    })
}