import axios from "axios";
import { CartData } from "../type/cartData";
import { productSelectData } from "../type/productSelectData";

export const fetchCartActive = async (id_user:number) : Promise<CartData> => {

    const response = await fetch("http://localhost:8000/cart/getActiveCart/" + id_user)
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.detail);
    }
    return response.json()
}

export const createCartUser = async (id_user:number) => {
    const { data } = await axios.get("http://localhost:8000/cart/createCart/" + id_user)
    return data
}

export const saveItemInCart = async (id_user:number, product:any) => {
    const { data } = await axios.put("http://localhost:8000/cart/saveItemInCart/"+id_user, product,{
        headers:{"Content-Type":"application/json"}
    })
    return data
}