import { CartData } from "../type/cartData";

export const fetchCartActive = async (id_user:number) : Promise<CartData> => {

    const response = await fetch("http://localhost:8000/cart/getActiveCart/" + id_user)
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.detail);
    }
    return response.json()

}