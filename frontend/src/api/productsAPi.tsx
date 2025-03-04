import { ProductData } from "../type/productData";

export const fetchProducts = async (): Promise<ProductData[]> => {
    const response = await fetch("http://localhost:8000/product")
    return response.json()
}

export const fetchAProduct = async (id_product:number): Promise<ProductData> => {
    const response = await fetch(`http://localhost:8000/product/${id_product}`)
    return response.json()
}