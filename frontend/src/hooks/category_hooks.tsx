import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../api/categoryApi"
import { CategoryData } from "../type/categoryData"

export const useCategory = () => {
    return useQuery<CategoryData[], Error>({
        queryKey:["categories"],
        queryFn: fetchCategories,
        
    })
}