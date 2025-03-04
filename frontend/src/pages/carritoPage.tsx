import { useFetcher, useNavigate } from "react-router-dom"
import Loading from "../components/loading"
import { useActivecart } from "../hooks/cart_hooks"
import { ItemCartCad } from "../components/itemCartCard"
import { useEffect } from "react"
import { CartOptions } from "../components/cartOptions"

const CarritoPage = () =>{

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)
    const id_user = Number(user.id)

    const{data:cart, isError, isLoading} = useActivecart(id_user)
    
    const navigate = useNavigate()

    
    if(!cart){
        return(
            <div className="flex items-center justify-center h-svh">
                <span className="text-2xl">El carrito esta vacio</span>
            </div>
        )
    }
    
    if(isLoading){
        return(<Loading/>)
    } 
    return(
        <div className="flex justify-between p-10">
            <div className="flex flex-col space-y-2">
                {cart!.cart_items.map((cartItem) => (
                    <ItemCartCad item={cartItem}></ItemCartCad>))}
            </div>
            <CartOptions cart={cart!}></CartOptions>
        </div>
    )

        
}


export default CarritoPage