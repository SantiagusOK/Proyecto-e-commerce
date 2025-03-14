import { useMutation, useQuery } from "@tanstack/react-query"
import { createCartUser, createItemInCart, fetchActiveCart, fetchItemCart, UpdateItemCart} from "../api/cartApi"
import { CartData } from "../type/cartData"
import { itemCartResponse } from "../type/itemCartResponse"
import { updateRoleuser } from "../api/userApi"

export const useActiveCart = (id_user:number) => {
    return useQuery<CartData, Error>({
        queryKey:["cart", id_user],
        queryFn: () => fetchActiveCart(id_user),
    })
}

export const useCreateCart = (id_user:number) => {
    return useQuery<Error>({
        queryKey:["cart", id_user],
        queryFn: () => createCartUser(id_user)
    })
}

export const useSaveItem = () => {
    return useMutation({
        mutationFn: (data: { id_user: number, product: any }) => createItemInCart(data.id_user, data.product)
    })
}

export const useItemCart = (id_item:number) => {
    return useQuery<itemCartResponse, Error>({
        queryKey: ["productItem"],
        queryFn: () => fetchItemCart(id_item)
    })
}

export const useUpdateItemCart = () => {
    return useMutation({
        mutationFn: (data: { id_item: number, itemUpdate: any }) => UpdateItemCart(data.id_item, data.itemUpdate)
    })
}