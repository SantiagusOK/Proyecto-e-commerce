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
    const [paginaActual, setPaginaActual] = useState(1);
    const limiteElementos = 5

    const indiceFinal = paginaActual * limiteElementos;
    const indiceInicial = indiceFinal - limiteElementos;
    const paginaFinal = Math.ceil(comprasList.length / limiteElementos)

    useEffect(()=>{
        fetch("http://localhost:8000/carrito/getAllBuy/"+user.id)
        .then((value)=>value.json())
        .then((data)=>setComprasList(data))
    },[])

    const cambiarPagina = (expresion:string) => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
          });
        if(expresion=="-"){setPaginaActual((e)=> e - 1)}
        else if(expresion=="+"){setPaginaActual((e)=> e + 1)}
      };

    return(
        <div className="flex flex-col space-y-1 items-center justify-center p-10 ">

            <div className=" flex justify-center items-center">
                {paginaActual > 1&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("-")}>{"<"}</button>)}
                <span className="ml-5 mr-5 pl-2 pr-2 text-2xl bg-blue-600 text-white rounded-[2px]">{paginaActual}</span>
                {paginaActual < paginaFinal&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("+")}>{">"}</button>)}
            </div>

            {comprasList.slice(indiceInicial, indiceFinal).map((compraItem)=>(
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
            <div className=" flex justify-center items-center">
                {paginaActual > 1&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("-")}>{"<"}</button>)}
                <span className="ml-5 mr-5 pl-2 pr-2 text-2xl bg-blue-600 text-white rounded-[2px]">{paginaActual}</span>
                {paginaActual < paginaFinal&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("+")}>{">"}</button>)}
            </div>
        </div>
    )
}


export default MisComprasPage