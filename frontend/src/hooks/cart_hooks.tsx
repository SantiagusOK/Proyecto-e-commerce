import { useMutation, useQuery } from "@tanstack/react-query"
import { createCartUser, createItemInCart, fetchActiveCart} from "../api/cartApi"
import { CartData } from "../type/cartData"

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