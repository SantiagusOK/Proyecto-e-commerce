import { CategoryData } from "../type/categoryData";

export const fetchCategories = async (): Promise<CategoryData[]> => {
    const response = await fetch("http://localhost:8000/category")
    return response.json()
}