import axios from "axios"
import { OrderData } from "../type/orderData"

export const fetchOrders = async (id_user:number) : Promise<OrderData[]> => {
    const {data} = await axios.get("http://localhost:8000/order/getOrdersUser/" + id_user)
    return data
}

export const fetchOrder = async (id_order:number) : Promise<OrderData> => {
    const { data }  = await axios.get("http://localhost:8000/order/" + id_order)
    return data
} 

export const createOrderUser = async (id_user:number) => {
    const { data } =  await axios.post("http://localhost:8000/order/createOrder/" + id_user, null ,{
        headers:{"Content-Type":"application/json"}
    })
    return data
}