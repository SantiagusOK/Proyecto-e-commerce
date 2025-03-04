import { CategoryData } from "./categoryData"

export interface ProductData{
    id:number
    name:string
    price:number
    id_category:number
    description:string
    stockMin:number
    stockMax:number
    stockCurrent:number
    category:CategoryData
}
