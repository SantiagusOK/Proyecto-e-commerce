import { useMutation, useQuery } from "@tanstack/react-query"
import { ProductData } from "../type/productData"
import { createProduct, fetchProduct, fetchProducts,updateProduct } from "../api/productsAPi"


export const useProducts = () => {
    return useQuery<ProductData[], Error>({
        select: (data) => (Array.isArray(data) ? data : []),
        queryKey:["product"],
        queryFn: fetchProducts,
        retry:false
    })
}

export const useProduct = (id_product:number) => {
    return useQuery<ProductData, Error>({
        queryKey:["product", id_product],
        queryFn: () => fetchProduct(id_product),
    })
}

export const useRegisterProduct = () => {
    return useMutation({
        mutationFn: createProduct
    })
}

export const useProductUpdate = () => {
    return useMutation({
        mutationFn: updateProduct
    })
}