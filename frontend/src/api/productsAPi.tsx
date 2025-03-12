import axios from "axios";
import { ProductData } from "../type/productData";
import { productRegister } from "../type/productRegister";
import { productUpdate } from "../type/productUpdate";

export const fetchProducts = async (): Promise<ProductData[]> => {
    const { data } = await axios.get("http://localhost:8000/product")
    return data
}

export const fetchProduct = async (id_product:number): Promise<ProductData> => {
    const response = await fetch(`http://localhost:8000/product/` + id_product)
    return response.json()
}

export const createProduct = async (product:any) => {
    const { data } = await axios.post("http://localhost:8000/product/create", product ,{
        headers:{"Content-Type":"application/json"}
    })
    return data
}

export const updateProduct = async (productUpdate:productUpdate) => {
    const { data } = await axios.put("http://localhost:8000/product/updateProduct", productUpdate ,{
        headers:{"Content-Type" : "application/json"}
    })
    return data
}