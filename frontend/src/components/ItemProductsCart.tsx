import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

interface categoryData{
    name:string
}

interface productData{
    name:string,
    price:number,
    stock:number,
    idProduct:number,
}

interface ProductsCartData{
    total:number
    cantidad:number,
    priceProduct:number,
    id_item_carrito:number,
    product:productData,
    category:categoryData
    
}

interface productParams{
    product:ProductsCartData
    category:categoryData

}

const ItemProductsCart = ({product, category}:productParams) =>{
        
        const storage = localStorage.getItem("userData")
        const user = JSON.parse(storage!)
        const idUser = user.idUser
        
        const deleteAItem = async ()=>{
            await fetch("http://localhost:8000/carrito/deleteAnItemCart/" + product.id_item_carrito,{
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
                        {product.product.name[0]}
                    </div>

                    <div className="space-y-2  w-80">
                        <h1 className="text-4xl font-black">{product.product.name}</h1>
                        <h1>CANTIDAD: x{product.cantidad}</h1>
                        <h1>PRECIO DEL PRODUCTO: ${product.product.price}</h1>
                        <h1 className="font-extrabold">TOTAL: ${product.total}</h1>
                    </div>

                    <div className=" items-end flex space-x-5 w-fit">
                        <NavLink to={"/inicioPage/carritoPage/itemCartEdit/" + product.id_item_carrito}>MODIFICAR CANTIDAD</NavLink>
                        <NavLink to={"/inicioPage/carritoPage"} onClick={deleteAItem}>ELIMINAR</NavLink>
                    </div>
                </div>
            </div>
        )
    }

export default ItemProductsCart