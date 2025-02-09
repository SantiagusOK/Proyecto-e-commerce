import { useEffect, useState } from "react"
import ItemProducts from "../components/ItemProduct"

interface ProductsData{
    id:number,
    name:string,
    price:number
}

interface CategorieData{
    id:number,
    name:string
}

const MenuPage = () => {
    const[produtsList, setProductsList] = useState<ProductsData[]>([])
    const[categorieList, setCategorieList] = useState<CategorieData[]>([])
    const[loading,setLoading] = useState<boolean>(false)

    useEffect(()=>{
        
        GetAllProducts()
        
        
    },[])

    const GetAllProducts=async()=>{
        setLoading(true)
        await fetch("http://localhost:8000/products/getAllProducts+categories")
        .then((value)=>value.json())
        .then((data)=>setProductsList(data))
        GetAllCategories()

    }

    const GetAllCategories=async()=>{
        await fetch("http://localhost:8000/categories/")
        .then((value)=>value.json())
        .then((data)=>setCategorieList(data))
        setLoading(false)
    }

    if(loading){
        return(
            <div className="p-50 flex flex-col space-y-2 items-center justify-center">
                <span>CARGANDO</span>
                <div className="bg-transparent border-b-8 border-neutral-500 animate-spin w-30 h-30 rounded-full"></div>

            </div>
        )
    }

    return(
        
        <div className="p-10 space-y-10 flex flex-col items-center">
            
            <div className="w-full justify-between flex items-center 0">
                {/* BARRA BUSQUEDA  + BOTON BUSCAR*/}
                <div>
                    <input className="bg-white w-80 p-2 rounded-l-2xl border-neutral-500 border-1" type="search"  name="" id="" />
                    {/* BOTON BUSCAR */}
                    <input className="bg-white p-2 border-1 w-fit text-center border-neutral-500 rounded-r-2xl cursor-pointer hover:hover:bg-blue-400 " type="button" value="BUSCAR" />
                </div>
                {/* TEXTO  + BOTON CATEGORIA*/}
                <div className="flex space-x-2 h-fit">
                    <h1 >Categoria:</h1>
                    <select className="bg-white w-50" >
                        <option value="">...</option>
                        {categorieList.map((categorie)=>(
                            <option value={categorie.id}>{categorie.name.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* RESULTADOS DE PRODUCTOS */}

            <div className=" space-y-[1px]">

                {produtsList.slice(0,5).map((products)=>(
                    <ItemProducts id={products.id} name={products.name} price={products.price}/>
                ))}

            </div>
            
            
        </div>
    )

}

export default MenuPage