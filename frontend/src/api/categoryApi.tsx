import axios from "axios";
import { CategoryData } from "../type/categoryData";
import { categoryRegisterData } from "../type/categoryRegister";

export const fetchCategories = async (): Promise<CategoryData[]> => {
    const {data} = await axios.get("http://localhost:8000/category")
    return data
}

export const createCategory = async (category:categoryRegisterData) => {
    const { data } = await axios.post("http://localhost:8000/category/create", category , {
        headers:{"Content-Type":"application/json"}
    })
    return data
} 