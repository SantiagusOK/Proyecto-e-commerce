import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

interface ProductsCartData{
    id_product:number,
    id:number
    total:number,
    amount:number
}

const ItemProductsCart = ({id,id_product, total, amount}:ProductsCartData) =>{
        
        
        const[nameItem,setName] = useState<String>("")
        const[priceItem,setPrice] = useState<number>(0)
        const[categorieItem,setCategorie] = useState<string>("")

        
        useEffect(()=>{
            fetch("http://localhost:8000/products/"+id_product)
            .then((value)=>value.json())
            .then((data)=>{
                setName(data[0].name)
                setPrice(data[0].price)
                setCategorie(data[0].categorie.name)
                
            })
        },[])

        const deleteAItem=()=>{
            fetch("http://localhost:8000/users/deleteAnItemCart/"+id,{
                method:"PUT"
            })
            window.location.reload();
        }
        
        return(
            <div className="w-fit h-fit shadow bg-white flex flex-col border-neutral-200 p-5">
                <div className="flex space-x-4  justify-star">
                    <div className="w-50 h-50 bg-neutral-700 rounded-full items-center justify-center flex text-white text-5xl">
                        {nameItem[0]}
                    </div>

                    <div className="space-y-2  w-80">
                        <h1 className="text-4xl font-black">{nameItem}</h1>
                        <h1>CATEGORIA: {categorieItem}</h1>
                        <h1>CANTIDAD: x{amount}</h1>
                        <h1>PRECIO DEL PRODUCTO: ${priceItem}</h1>
                        <h1 className="font-extrabold">TOTAL: ${total}</h1>
                    </div>

                    <div className=" items-end flex space-x-5 w-fit">
                        <NavLink to={"/inicioPage/itemCartEdit/"+String(id)}>MODIFICAR</NavLink>
                        <NavLink to={"/inicioPage/carritoPage"} onClick={deleteAItem}>ELIMINAR</NavLink>
                        
                    </div>
                </div>
            </div>
        )
    }

export default ItemProductsCart