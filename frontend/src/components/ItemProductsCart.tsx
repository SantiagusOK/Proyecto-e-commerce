import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

interface ProductsCartData{
    id_item_carrito:number,
    cantidad:number,
    product:string,
    priceProduct:number,
    total:number
}

interface itemCartData{
    item: ProductsCartData
}

const ItemProductsCart = ({item}:itemCartData) =>{
        
        const storage = localStorage.getItem("userData")
        const user = JSON.parse(storage!)
        const idUser = user.idUser
        const idItem = item.id_item_carrito

        console.log(idItem)
        
        const deleteAItem = async ()=>{
            await fetch("http://localhost:8000/carrito/deleteAnItemCart/" + idItem + "/" + idUser,{
                method:"PUT",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({})
            })
            window.location.reload();
        }
        
        return(
            <div className="w-fit h-fit shadow bg-white flex flex-col border-neutral-200 p-5">
                
                <div className="flex space-x-4  justify-star">
                    <div className="w-50 h-50 bg-neutral-700 rounded-full items-center justify-center flex text-white text-5xl">
                        {item.product[0]}
                    </div>

                    <div className="space-y-2  w-80">
                        <h1 className="text-4xl font-black">{item.product}</h1>
                        <h1>CANTIDAD: x{item.cantidad}</h1>
                        <h1>PRECIO DEL PRODUCTO: ${item.priceProduct}</h1>
                        <h1 className="font-extrabold">TOTAL: ${item.total}</h1>
                    </div>

                    <div className=" items-end flex space-x-5 w-fit">
                        <NavLink to={"/inicioPage/carritoPage/itemCartEdit/" + idItem}>MODIFICAR CANTIDAD</NavLink>
                        <NavLink to={"/inicioPage/carritoPage"} onClick={deleteAItem}>ELIMINAR</NavLink>
                    </div>
                </div>
            </div>
        )
    }

export default ItemProductsCart