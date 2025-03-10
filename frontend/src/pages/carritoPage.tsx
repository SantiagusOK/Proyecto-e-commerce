import Loading from "../components/loading"
import { useActivecart } from "../hooks/cart_hooks"
import { ItemCartCad } from "../components/itemCartCard"

import { CartOptions } from "../components/cartOptions"

const CarritoPage = () =>{

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)
    const id_user = Number(user.id)

    const{data:cart, isFetching} = useActivecart(id_user)
    
    
    
    if(isFetching){
        return(<Loading/>)
    }

    if(!cart){
        return(
            <div className="flex justify-center items-center p-10">
                <span className="text-4xl">El carrito esta vacio :)</span>
            </div>
        )
    }
    
    return(
        
        <div className="flex justify-center space-x-10 p-10">
            
            <div className="flex flex-col space-y-2">
                {cart.cart_items.length > 0 && (
                    cart.cart_items.map((cartItem) => (
                        <ItemCartCad item={cartItem}></ItemCartCad>)))}
                
            </div>
            <CartOptions cart={cart}></CartOptions>

        </div>
    )

        
}


export default CarritoPage