import { useEffect, useState } from "react"
import ItemCompra from "../components/ItemCompra"
import ProductsItem from "../components/ItemCompra"
import Loading from "../components/loading"

interface itemProduct{
    name:string
    cantidad:number
    totalCantidad:number
    categoria:string
}

interface comprasData{
    fechaCompra:string
    id_compra:number
    totalCompra:number
    productos:itemProduct[]
}

const MisComprasPage = () =>{

    const[comprasList, setComprasList] = useState<comprasData[]>([])
    const[loading, setLoading] = useState<boolean>(false)

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)
    const [paginaActual, setPaginaActual] = useState(1);
    const limiteElementos = 5

    const indiceFinal = paginaActual * limiteElementos;
    const indiceInicial = indiceFinal - limiteElementos;
    const paginaFinal = Math.ceil(comprasList.length / limiteElementos)

    useEffect(()=>{

        get_all_compras()
        
    },[])

    const get_all_compras=async()=>{
        setLoading(true)
        await fetch("http://localhost:8000/carrito/getAllBuy/"+user.idUser)
        .then((value)=>value.json())
        .then((data)=>setComprasList(data))
        setLoading(false)
    }

    const cambiarPagina = (expresion:string) => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
          });
        if(expresion=="-"){setPaginaActual((e)=> e - 1)}
        else if(expresion=="+"){setPaginaActual((e)=> e + 1)}
      };

    if(loading){
        return(<Loading/>)
    }

    return(
        
        <div className="flex flex-col space-y-1 items-center justify-center p-10 ">
            {comprasList.length==0 &&(
            <div className="flex flex-col w-full text-center text-4xl">
                <span>No tienes una compra ahora mismo :(</span>
            </div>
            )}

            {comprasList.length>=1 &&(
            <>
                <div className=" flex justify-center items-center">
                    {paginaActual > 1&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("-")}>{"<"}</button>)}
                    {paginaActual != indiceFinal &&(<span className="ml-5 mr-5 pl-2 pr-2 text-2xl bg-blue-600 text-white rounded-[2px]">{paginaActual}</span>)}
                    {paginaActual < paginaFinal&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("+")}>{">"}</button>)}
                </div> 

                {comprasList.slice(indiceInicial, indiceFinal).map((compraItem)=>(
                    <div className="bg-neutral-100 w-fit p-5 rounded shadow">
                        <div className="flex justify-between mt-2 mb-5">
                            <h1>Fecha de compra</h1>
                            <h1>{compraItem.fechaCompra}</h1>
                        </div>
                        <div className="flex justify-between  rounded-2xl pb-5">
                            <h1 className="text-3xl font-bold">Total</h1>
                            <h1 className="text-3xl text-green-700 font-bold">${compraItem.totalCompra}</h1>
                        </div>

                        {compraItem.productos.map((compras)=>(
                                
                                <ProductsItem  product={compras}/>
            
                        ))}

                    </div>
                    
                ))}
                <div className=" flex justify-center items-center">
                    {paginaActual > 1&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("-")}>{"<"}</button>)}
                    {paginaActual != indiceFinal &&(<span className="ml-5 mr-5 pl-2 pr-2 text-2xl bg-blue-600 text-white rounded-[2px]">{paginaActual}</span>)}
                    {paginaActual < paginaFinal&&(<button className="text-2xl font-bold cursor-pointer" onClick={()=>cambiarPagina("+")}>{">"}</button>)}
                </div>   
            </>
            )}
            
        </div>
    )
}


export default MisComprasPage