import axios from "axios"
import { OrderData } from "../type/orderData"

export const fetchOrdersUser = async (id_user:number) : Promise<OrderData[]> => {
    const response = await fetch("http://localhost:8000/order/getOrdersUser/" + id_user)
    if(!response.ok){
        const data = await response.json()
        throw new Error(data.detail)
    }
    return response.json()
}

export const fetchAnOrder = async (id_product:number) : Promise<OrderData> => {
    const order  = await fetch("http://localhost:8000/order/" + id_product)
    return order.json()
} 