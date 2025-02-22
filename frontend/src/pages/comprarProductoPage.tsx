import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemBuyProduct } from "../components/itemBuyProduct";

export const ComprarProductoPage = () => {

    const storage = localStorage.getItem("product")
    const product = JSON.parse(storage!)

    const storageUser = localStorage.getItem("userData")
    const user = JSON.parse(storageUser!)

    const[processingBuy, setProcessingBuy] = useState<boolean>(false)
    const[loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const realizeBuy=async()=>{
        setProcessingBuy(true)
        setLoading(true)
        const storage = localStorage.getItem("userData")
        const user = JSON.parse(storage!)

        const fecha = new Date()
        const fechaStr = fecha.toLocaleString()

        const productsItem = [
            {   
                id:400,
                id_product: product.id,
                total:product.total,
                amount:product.amount
            }
        ]

        const response = await fetch("http://localhost:8000/carrito/realizeABuy/"+user.id,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id_user:user.id, 
                comprasList:productsItem, 
                fechaDeCompra:fechaStr,
                totalCompra:Number(product.total),})
        })

        if(response.status == 200){
            navigate("/inicioPage/compraRealizadaPage")
        }

        setProcessingBuy(false)
        setLoading(false)
    }

    return(
        <div className="flex flex-col items-center justify-center h-200 space-y-4">
            <ItemBuyProduct product={product} user={user}/>
            <button type="button" onClick={realizeBuy} className="bg-blue-400 text-3xl rounded-2xl p-4 w-100 cursor-pointer transition hover:bg-blue-600 text-white flex items-center justify-center">
                {processingBuy && <div className="w-10 h-10 bg-transparent border-transparent border-4 border-t-blue-500 rounded-full mr-5 animate-spin"></div>}
                Realizar Compra
            </button>
            <button type="button" className="bg-blue-400 text-3xl rounded-2xl p-4 w-100 cursor-pointer transition hover:bg-blue-600 text-white">
                Cancelar
            </button>
        </div>
    )
};