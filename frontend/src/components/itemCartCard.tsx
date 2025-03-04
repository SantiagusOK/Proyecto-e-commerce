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
        <div className="bg-white rounded-2xl flex w-170 h-fit">
            {/* LOGO */}
            <div className="bg-blue-300 w-40 h-40 flex items-center justify-center rounded-l-2xl">
                <span className="text-4xl">{item.product.name[0]}</span>
            </div>

            {/* DATOS */}
            <div className=" w-lg p-2 flex-col flex-1">
                <p className="text-3xl font-bold">{item.product.name}</p>
                <p className="text-1xl">Unidades: x{item.quantity}</p>
                
                <p className="text-1xl">Total: ${item.unityPrice}</p>
            </div>
            

            <div className="space-x-7 p-2 flex items-end">
                <NavLink to={""} className={"font-medium"}>EDITAR</NavLink>
                <button className={"font-medium cursor-pointer"} onClick={delete_a_item}>ELIMINAR</button>
            </div>
        </div>
    )
}