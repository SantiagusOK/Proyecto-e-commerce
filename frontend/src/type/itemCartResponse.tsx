import { ProductData } from './productData'

export interface itemCartResponse{
    id:number
    id_cart: number
    id_product: number
    quantity: number
    unityPrice: number
    product:ProductData
}
