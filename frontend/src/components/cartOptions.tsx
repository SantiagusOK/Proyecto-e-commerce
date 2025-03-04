import { CartData } from "../type/cartData";

interface CartInterface{
    cart:CartData
}

export const CartOptions = ({cart}:CartInterface)=> {

    const totalOrdern = cart.cart_items.length

    const local = localStorage.getItem("userData")
    const user = JSON.parse(local!)


    return (
        <div className="bg-white w-130 h-fit p-4 space-y-1 rounded-2xl">
            <div className="flex justify-between">
                <p>Fecha de creacion</p>
                <p>{cart.createdAt}</p>
            </div>

            <div className="flex justify-between">
                <p>Cantidad de pedidos</p>
                <p>x{totalOrdern}</p>
            </div>

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
            
            <div className="flex justify-between">
                <p>Total</p>
                <p>${cart.totalCart}</p>
            </div>

            <button className="bg-blue-400 p-2 w-full cursor-pointer rounded-[10px] transition hover:bg-blue-600">
                <span className="text-white">Realizar Comprar</span>
            </button>
        </div>
    )
}