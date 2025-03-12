import axios from "axios";
import { CartData } from "../type/cartData";
import { productSelectData } from "../type/productSelectData";

export const fetchActiveCart = async (id_user:number) : Promise<CartData> => {

    const {data} = await axios.get("http://localhost:8000/cart/getActiveCart/" + id_user)
    return data
}

export const createCartUser = async (id_user:number) => {
    const { data } = await axios.get("http://localhost:8000/cart/createCart/" + id_user)
    return data
}

export const createItemInCart = async (id_user:number, product:any) => {
    const { data } = await axios.put("http://localhost:8000/cart/saveItemInCart/"+id_user, product,{
        headers:{"Content-Type":"application/json"}
    })
    return data
}