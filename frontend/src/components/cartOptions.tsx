import { useNavigate } from "react-router-dom";
import { CartData } from "../type/cartData";
import { userCreateOrder } from "../hooks/order_hooks";

interface CartInterface{
    cart:CartData
}

export const CartOptions = ({cart}:CartInterface)=> {

    const totalOrdern = cart.cart_items.length
    const navigate = useNavigate()
    const orderMutation = userCreateOrder()


    const local = localStorage.getItem("userData")
    const user = JSON.parse(local!)
    const id_user = Number(user.id)

    const realize_buy = async () => {
        orderMutation.mutate(id_user)
    }

    if(orderMutation.isSuccess){
        navigate("/inicioPage/compraRealizadaPage")
    }

    return (
        <div className="bg-neutral-600 w-130 h-fit p-5 space-y-5 rounded-[10px] text-white">
            <div>
                <div className="flex justify-between">
                    <p>Fecha de creacion</p>
                    <p>{cart.createdAt}</p>
                </div>

                <div className="flex justify-between">
                    <p>Cantidad de pedidos</p>
                    <p>x{totalOrdern}</p>
                </div>
            </div>

            <hr/>

            <div className="flex flex-col">
                

                <div className="flex justify-between">
                    <p>Calle</p>
                    <p>{user.address.street}</p>
                </div>

                <div className="flex justify-between">
                    <p>Ciudad</p>
                    <p>{user.address.city}</p>
                </div>

                <div className="flex justify-between">
                    <p>Estado</p>
                    <p>{user.address.state}</p>
                </div>

                <div className="flex justify-between">
                    <p>Pais</p>
                    <p>{user.address.country}</p>
                </div>

                <div className="flex justify-between">
                    <p>Codigo Postal</p>
                    <p>{user.address.postal_code}</p>
                </div>
            </div>

            <hr className="h-2"/>
            
            <div className="flex justify-between text-2xl font-bold">
                <p>Total</p>
                <p>${cart.totalCart}</p>
            </div>

            <div>
                {
                    orderMutation.isError&&(<p className="text-red-400 w-full text-center">Hubo un error al intentar realizar la compra</p>)
                }
                <button className="bg-neutral-500 p-2 w-full cursor-pointer rounded transition hover:bg-neutral-400 flex items-center justify-center space-x-3" onClick={realize_buy}>
                    {   
                        orderMutation.isPending&&(<div className="w-5 h-5 border-2 border-t-transparent border-l-transparent rounded-full animate-spin"></div>)
                    }
                    <span className="text-white font-bold">
                        Realizar Comprar
                    </span>
                </button>
            </div>
        </div>
    )
}