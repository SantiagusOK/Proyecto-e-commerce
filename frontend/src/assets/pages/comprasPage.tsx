import { useEffect, useState } from "react"
import ItemCompra from "../components/ItemCompra"
import ProductsItem from "../components/ItemCompra"

interface itemCarritoData{
    idItemCarrito: number
    id_product: number
    total: number
    amount: number
}

interface comprasData{
    idCompra:number
    id_user:number
    fechaDeCompra:string
    totalCompra:number
    comprasList:itemCarritoData[]
}

const MisComprasPage = () =>{

    const[comprasList, setComprasList] = useState<comprasData[]>([])

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)

    useEffect(()=>{
        fetch("http://localhost:8000/users/getAllCart/"+user.id)
        .then((value)=>value.json())
        .then((data)=>setComprasList(data))
    },[])

    return(
        <div className="flex flex-col space-y-1 items-center justify-center p-10 ">
            
            {comprasList.map((compraItem)=>(
                <div className="bg-neutral-100 w-fit p-5 rounded shadow">
                    <div className="flex justify-between mt-2 mb-5">
                        <h1>Fecha de compra</h1>
                        <h1>{compraItem.fechaDeCompra}</h1>
                    </div>
                    <div className="flex justify-between  rounded-2xl pb-5">
                        <h1 className="text-3xl font-bold">Total</h1>
                        <h1 className="text-3xl text-green-700 font-bold">${compraItem.totalCompra}</h1>
                    </div>

                    {compraItem.comprasList.map((compras)=>(
                            
                            <ProductsItem id_product={compras.id_product} amount={compras.amount} totalProduct={compras.total} />
        
                    ))}

                </div>
                
            ))}
        </div>
    )
}


export default MisComprasPage