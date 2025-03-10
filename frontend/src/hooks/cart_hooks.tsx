import { useQueries, useQuery } from "@tanstack/react-query"
import { fetchCartActive } from "../api/cartApi"
import { CategoryData } from "../type/categoryData"
import { CartData } from "../type/cartData"

export const useActivecart = (id_user:number) => {
    return useQuery<CartData, Error>({
        queryKey:["cart", id_user],
        queryFn: () => fetchCartActive(id_user),
        retry:false
    })
}