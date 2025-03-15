import axios from "axios"
import { OrderData } from "../type/orderData"

export const fetchOrdersUser = async (id_user:number) : Promise<OrderData[]> => {
    const {data} = await axios.get("http://localhost:8000/order/getOrdersUser/" + id_user)
    return data
}

export const fetchOrders = async () => {
    const { data } = await axios.get("http://localhost:8000/order")
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

export const updateOrderState = async (id_order:number, id_state:number) => {
    const { data } =  await axios.put("http://localhost:8000/order/updateState/" + id_order + "/" + id_state, null ,{
        headers:{"Content-Type":"application/json"}
    })
    return data
}