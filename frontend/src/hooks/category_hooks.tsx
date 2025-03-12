import { useMutation, useQuery } from "@tanstack/react-query"
import { createCategory, fetchCategories } from "../api/categoryApi"
import { CategoryData } from "../type/categoryData"

export const useCategories = () => {
    return useQuery<CategoryData[], Error>({
        select: (data) => (Array.isArray(data) ? data : []),
        queryKey:["categories"],
        queryFn: fetchCategories
    })
}

export const useRegisterCategory = () => {
    return useMutation({
        mutationFn: createCategory
    })
}