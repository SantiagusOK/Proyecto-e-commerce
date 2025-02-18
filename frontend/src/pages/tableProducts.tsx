import { useEffect, useState } from "react"
import Loading from "../components/loading"
import { NavLink } from "react-router-dom"

interface categorieData{
    id:number,
    name:string
}

interface listProductsData{
    id:number,
    name:string,
    price:number,
    categorie:categorieData
    stock:number
}

const AllProductsPage= () =>{

    const [listProducts, setListProducts] = useState<listProductsData[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{
        get_all_products()
    },[])


    const get_all_products=async()=>{
        setLoading(true)
        await fetch("http://localhost:8000/products/")
        .then((values) => values.json())
        .then((data) => setListProducts(data))
        setLoading(false)
    }

    if(loading){
        return(<Loading/>)
    }

    if(listProducts.length<=0){
        return(<div className="flex h-screen items-center justify-center  text-2xl">No hay productos registrados</div>)
    } else {
        return(        
            <div className="flex flex-col items-center justify-start p-5">
                {listProducts.map((product)=>(
                    <div className="bg-white p-5 flex w-160 m-0.5 items-center space-x-3">

                        <div className="bg-neutral-400 h-20 w-20 rounded-full flex items-center justify-center">
                            {product.name[0]}
                        </div>

                        <div className="flex flex-col w-sm">
                            <span className="text-2xl">{product.name}</span>
                            <span className="text-2xl font-extralight">${product.price}</span>
                            <span className="font-medium">Stock: {product.stock}</span>
                        </div>

                        <div className="">
                            <NavLink to={"/inicioPage/allProductsPage/editProduct/" + product.id}>EDITAR</NavLink>
                        </div>

                    </div>
                ))}

            </div>
        )
    }
}

export default AllProductsPage