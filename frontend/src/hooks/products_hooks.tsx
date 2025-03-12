import { useMutation, useQuery } from "@tanstack/react-query"
import { ProductData } from "../type/productData"
import { fetchAProduct, fetchProducts, registerProduct } from "../api/productsAPi"


export const useProducts = () => {
    return useQuery<ProductData[], Error>({
        select: (data) => (Array.isArray(data) ? data : []),
        queryKey:["product"],
        queryFn: fetchProducts,
        retry:false
    })
}

export const useAnProducts = (id_product:number) => {
    return useQuery<ProductData, Error>({
        queryKey:["product", id_product],
        queryFn: () => fetchAProduct(id_product),
    })
}

export const registerAProduct = () => {
    return useMutation({
        mutationFn: registerProduct
    })
}