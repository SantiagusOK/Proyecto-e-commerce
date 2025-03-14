import { NavLink } from "react-router-dom";
import { CartItemData } from "../type/cartItemData";

interface CartInterface{
    item : CartItemData
}

export const ItemCartCad = ({item} : CartInterface) => {

    const delete_a_item = async () => {
        const response = await fetch("http://localhost:8000/cart/deleteItemCart/" + item.id,{
            method:"PUT",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({})
        })
        window.location.reload();
    }
    
    return(
        <div className="bg-neutral-600 rounded flex w-170 h-fit">
            {/* LOGO */}
            <div className="bg-blue-300 w-40 h-40 flex items-center justify-center rounded-l-2xl">
                <img className="object-cover w-full h-full rounded-l" src={item.product.urlImage} alt="" />
            </div>

            {/* DATOS */}
            <div className=" w-lg p-2 flex-col flex-1">
                <p className="text-3xl font-bold text-white">{item.product.name}</p>
                <p className="text-1xl text-white">Unidades: x{item.quantity}</p>
                
                <p className="text-1xl text-white">Total: ${item.unityPrice}</p>
            </div>
            
            <div className="space-x-7 p-2 flex items-end">
                <NavLink to={"/inicioPage/carritoPage/itemCartEdit/" + item.id} className={"font-medium text-white"}>EDITAR</NavLink>
                <button className={"font-medium cursor-pointer text-white"} onClick={delete_a_item}>ELIMINAR</button>
            </div>
        </div>
    )
}