import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchCategories, registerCategory } from "../api/categoryApi"
import { CategoryData } from "../type/categoryData"

export const useCategory = () => {
    return useQuery<CategoryData[], Error>({
        select: (data) => (Array.isArray(data) ? data : []),
        queryKey:["categories"],
        queryFn: fetchCategories
    })
}

export const categoryRegister = () => {
    return useMutation({
        mutationFn: registerCategory
    })
}