import { useNavigate } from "react-router-dom";
import { CartData } from "../type/cartData";

interface CartInterface{
    cart:CartData
}

export const CartOptions = ({cart}:CartInterface)=> {

    const totalOrdern = cart.cart_items.length
    const navigate = useNavigate()

    const local = localStorage.getItem("userData")
    const user = JSON.parse(local!)
    const id_user = Number(user.id)

    const realize_buy = async () => {
        const response = await fetch("http://localhost:8000/order/createOrder/" + id_user,{
            method:"POST"
        })
        if(response.ok){
            navigate("/inicioPage/misComprasPage")
        }
    }

    return (
        <div className="bg-white w-130 h-fit p-8 space-y-5 rounded-[10px]">
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

            <button className="bg-blue-400 p-2 w-full cursor-pointer rounded-[10px] transition hover:bg-blue-600" onClick={realize_buy}>
                <span className="text-white font-bold">Realizar Comprar</span>
            </button>
        </div>
    )
}