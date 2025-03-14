import axios from "axios";

export const fetchActiveCart = async (id_user:number) => {
    try{
        const {data} = await axios.get("http://localhost:8000/cart/getActiveCart/" + id_user)
        return data
    } catch(error){
        return error
    }
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

export const fetchItemCart = async (id_item:number) => {
    const { data } = await axios.get("http://localhost:8000/cart/getItemCart/" + id_item)
    return data
}

export const UpdateItemCart = async (id_item:number, productUpdate:any) => {
    const { data } = await axios.put("http://localhost:8000/cart/modifyAnItemCart/"+id_item, productUpdate , {
        headers: {"Content-Type" : "application/json"}
    })
    return data
}