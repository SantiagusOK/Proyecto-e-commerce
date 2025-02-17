import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

interface ProductsCartData{
    id_product:number,
    id:number
    total:number,
    amount:number
}

interface itemCartData{
    item: ProductsCartData
}

const ItemProductsCart = ({item}:itemCartData) =>{
        
        const[nameItem,setName] = useState<String>("")
        const[priceItem,setPrice] = useState<number>(0)
        const[categorieItem,setCategorie] = useState<string>("")
        const[itemData, setItemData] = useState<itemCartData>()

        // setItemData()

        const storage = localStorage.getItem("userData")
        const user = JSON.parse(storage!)
        const idUser = user.id

        const idItem =item.id
        
        useEffect(()=>{
            fetch("http://localhost:8000/products/"+item.id_product)
            .then((value)=>value.json())
            .then((data)=>{
                setName(data[0].name)
                setPrice(data[0].price)
                setCategorie(data[0].categorie.name)
                
            })
        },[])

        const deleteAItem=()=>{
            fetch("http://localhost:8000/carrito/deleteAnItemCart/"+idItem+"/"+idUser,{
                method:"PUT",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({})
            })
            window.location.reload();
        }
        
        return(
            <div className="w-fit h-fit shadow bg-white flex flex-col border-neutral-200 p-5">
                <h1>{item.id}</h1>
                <div className="flex space-x-4  justify-star">
                    <div className="w-50 h-50 bg-neutral-700 rounded-full items-center justify-center flex text-white text-5xl">
                        {nameItem[0]}
                    </div>

                    <div className="space-y-2  w-80">
                        <h1 className="text-4xl font-black">{nameItem}</h1>
                        <h1>CATEGORIA: {categorieItem}</h1>
                        <h1>CANTIDAD: x{item.amount}</h1>
                        <h1>PRECIO DEL PRODUCTO: ${priceItem}</h1>
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