import axios from "axios";
import { CategoryData } from "../type/categoryData";
import { categoryRegisterData } from "../type/categoryRegister";

export const fetchCategories = async (): Promise<CategoryData[]> => {
    const response = await fetch("http://localhost:8000/category")
    return response.json()
}

export const registerCategory = async (category:categoryRegisterData) => {
    const { data } = await axios.post("http://localhost:8000/category/create", category , {
        headers:{"Content-Type":"application/json"}
    })
    return data
} 