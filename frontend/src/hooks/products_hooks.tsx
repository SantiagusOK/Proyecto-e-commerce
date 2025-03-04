import { useQuery } from "@tanstack/react-query"
import { ProductData } from "../type/productData"
import { fetchAProduct, fetchProducts } from "../api/productsAPi"

export const useProducts = () => {
    return useQuery<ProductData[], Error>({
        queryKey:["product"],
        queryFn: fetchProducts,
    })
}

export const useAnProducts = (id_product:number) => {
    return useQuery<ProductData, Error>({
        queryKey:["product", id_product],
        queryFn: () => fetchAProduct(id_product),
    })
}