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

    useEffect(()=>{
        fetch("http://localhost:8000/users/getAllCart/1")
        .then((value)=>value.json())
        .then((data)=>setComprasList(data))
    },[])


    

    return(
        <div className="flex flex-col space-y-5 items-center justify-center p-10 ">
            
            {comprasList.map((compraItem)=>(
                <div className="bg-neutral-100 w-fit p-5 rounded-2xl shadow">
                    
                    {compraItem.comprasList.map((compras)=>(
                        
                            
                            <ProductsItem id_product={compras.id_product} amount={compras.amount} totalProduct={compras.total} />
        
                        
                    ))}
                    <div className="flex flex-col justify-between">
                        <h1>Fecha de compra</h1>
                        <h1>{compraItem.fechaDeCompra}</h1>
                    </div>

                    <div className="flex justify-between bg-neutral-300 rounded-2xl p-5">
                        <h1 className="text-3xl font-bold">Total</h1>
                        <h1 className="text-3xl text-green-700 font-bold">${compraItem.totalCompra}</h1>
                    </div>
                    
                    
                </div>
                
            ))}
        </div>
    )
}


export default MisComprasPage