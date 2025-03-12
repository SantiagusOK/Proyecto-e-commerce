import { useMutation, useQuery } from "@tanstack/react-query"
import { createCartUser, fetchCartActive, saveItemInCart } from "../api/cartApi"
import { CartData } from "../type/cartData"

export const useActivecart = (id_user:number) => {
    return useQuery<CartData, Error>({
        queryKey:["cart", id_user],
        queryFn: () => fetchCartActive(id_user),
        retry:false
    })
}

export const createCart = (id_user:number) => {
    return useQuery<Error>({
        queryKey:["cart", id_user],
        queryFn: () => createCartUser(id_user)
    })
}

export const saveItem = () => {
    return useMutation({
        mutationFn: (data: { id_user: number, product: any }) => saveItemInCart(data.id_user, data.product)
    })
}