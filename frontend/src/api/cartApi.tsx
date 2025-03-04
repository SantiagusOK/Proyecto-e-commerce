import { CartData } from "../type/cartData";

export const fetchCartActive = async (id_user:number) : Promise<CartData> => {
    const response = await fetch("http://localhost:8000/cart/getCart/" + id_user)
    return response.json()
}