import { useEffect, useState } from "react"
import ItemProducts from "../components/ItemProduct"
import Loading from "../components/loading"

interface ProductsData{
    id:number,
    name:string,
    price:number
    stock:number
}

interface CategorieData{
    id:number,
    name:string
}

const MenuPage = () => {

    const[produtsList, setProductsList] = useState<ProductsData[]>([])
    const[categorieList, setCategorieList] = useState<CategorieData[]>([])
    const[valueSearch, setValueSearch] = useState<string>("")
    const[categorie, setCategorie] = useState<number>(0)
    const[loading,setLoading] = useState<boolean>(false)

    const [paginaActual, setPaginaActual] = useState(1);

    const limiteElementos = 5

    const indiceFinal = paginaActual * limiteElementos;
    const indiceInicial = indiceFinal - limiteElementos;
    const paginaFinal = Math.ceil(produtsList.length / limiteElementos)


    useEffect(()=>{
        GetAllProducts()
    },[])

    const GetAllProducts=async()=>{
        setPaginaActual(1)
        setLoading(true)
       await fetch("http://localhost:8000/products/searchByName/",{
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({name:valueSearch, categorie:categorie})
       })
        .then((value)=>value.json())
        .then((data)=>{
            setProductsList(data)
        })
        GetAllCategories()
    }

    const GetAllCategories=async()=>{
        console.log("categoria seleccionada: " + categorie)
       await fetch("http://localhost:8000/categories/")
        .then((value)=>value.json())
        .then((data)=>setCategorieList(data))
        setLoading(false)
    }

    if(loading){
        return(<Loading/>)
    }

    const selectCategorie=(value:string)=>{
        setCategorie(Number(value))
        
    }

    const cambiarPagina = (expresion:string) => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
          });
        if(expresion=="-"){setPaginaActual((e)=> e - 1)}
        else if(expresion=="+"){setPaginaActual((e)=> e + 1)}
      };


    return(
        <div className="p-10 space-y-10 flex flex-col items-center">
            <div className="w-full justify-between flex items-center 0">
                {/* BARRA BUSQUEDA  + BOTON BUSCAR*/}
                <div>
                    <input className="bg-white w-80 p-2 rounded-l-2xl border-neutral-500 border-1 outline-none" type="search" value={valueSearch} onChange={(e) => setValueSearch(e.target.value)}/>
                    {/* BOTON BUSCAR */}
                    <input className="bg-white p-2 border-1 w-fit text-center border-neutral-500 rounded-r-2xl cursor-pointer hover:hover:bg-blue-400 " type="button" value="BUSCAR" onClick={GetAllProducts}/>
                </div>
                {/* TEXTO  + BOTON CATEGORIA*/}
                <div className="flex space-x-2 h-fit">
                    <h1>Categoria:</h1>
                    <select className="w-fit" value={categorie} onChange={(event)=>selectCategorie(event.target.value)}  >
                        <option value={0}>...</option>
                        {categorieList.map((categorie)=>(
                            <option value={categorie.id}>{categorie.name.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* RESULTADOS DE PRODUCTOS */}

            {produtsList.length==0 &&(
                <div className="flex flex-col w-full text-center text-4xl">
                    <span>No hay productos en esta categoria :(</span>
                </div>
            )}

            {produtsList.length>=1 &&(
                <>
                    <div>
                        {produtsList.slice(indiceInicial, indiceFinal).map((products, index)=>(
                            <ItemProducts product={products} key={index} />
                        ))}
                    </div>

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

export default MenuPage