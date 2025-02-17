import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Loading from "../components/loading"

const EditProductPage = () =>{
    const [loading, setLoading] = useState<boolean>(false)
    const [idProduct, setIdProduct] = useState<number>(0)
    const [nameProduct, setnameProduct] = useState<string>("")
    const [priceProduct, setPriceProduct] = useState<number>(0)
    const [stockProduct, setStockProduct] = useState<number>(0)
    const [categoryProduct, setCategoryProduct] = useState<string>("")
    const [loadingData, setLoadingData] = useState<boolean>(false)

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)
    const idUser = user.id

    const {id} = useParams()

    useEffect(()=>{
        get_product()
    },[])

    const get_product=async()=>{
        setLoading(true)
        await fetch("http://localhost:8000/products/" + id)
        .then((value)=>value.json())
        .then((data)=>{
            setIdProduct(data[0].id)
            setnameProduct(data[0].name),
            setPriceProduct(data[0].price),
            setCategoryProduct(data[0].categorie.name)
        })
        setLoading(false)
    }

    const save_Data=async()=>{
        setLoadingData(true)
        await fetch("http://localhost:8000/products/updatePrice",{
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify({id:idProduct ,price:priceProduct, stock:stockProduct})
        })
        setLoadingData(false)
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        <div className="basis-full flex items-center justify-center">
            {/* CUADRADO */}
            <div className=" flex flex-col bg-white h-fit w-200 space-y-20 p-10 rounded-b-4xl shadow" >

                {/* FOTO */}
                <div className="flex flex-col items-center ">
                    <div className="w-50 h-50 bg-neutral-700 rounded-full flex items-center justify-center text-6xl text-white">
                        {nameProduct[0]}
                    </div>
                    <div className="flex flex-col items-center ">
                        <h1 className="text-4xl font-extrabold">{nameProduct}</h1>
                        <h1 className="font-black">[ {categoryProduct} ]</h1> 
                    </div>   
                </div>

                <div className="space-y-3">
                    <div className=" flex justify-center">
                        <div className="border-2 p-2 w-130 rounded-2xl border-neutral-400 text-4xl">
                            <span className="text-neutral-400">$: </span>
                            <input type="number" className="outline-none" placeholder={String(priceProduct)}  onChange={(e)=>setPriceProduct(Number(e.target.value))}/>
                        </div> 
                    </div>

                    <div className=" flex justify-center">
                        <div className="border-2 p-2 w-130 rounded-2xl border-neutral-400 text-4xl">
                            <span className="text-neutral-400">x: +</span>
                            <input type="number" className="outline-none" placeholder="0"  onChange={(e)=>setStockProduct(Number(e.target.value))}/>
                        </div> 
                    </div> 
                </div>

                {/* BOTONES DE GUARDAR O CANCELAR*/}
                <div className="space-y-4">
                    <NavLink to={""} className="h-20 rounded-3xl font-medium cursor-pointer flex items-center justify-center bg-blue-300 text-white transition duration-300 hover:bg-blue-600"  onClick={save_Data}>
                        {loadingData &&(
                          <div className="h-10 w-10 border-4 border-b-blue-500 border-transparent rounded-full animate-spin mr-5"></div>  
                        )}
                         
                        GUARDAR CAMBIOS
                    </NavLink>
                    <NavLink to={"/inicioPage/allProductsPage"} className="h-20 rounded-3xl  2 font-medium cursor-pointer flex items-center justify-center bg-blue-500 text-white transition duration-300 hover:bg-blue-600" >
                        CANCELAR
                    </NavLink>
                </div>
            </div>
        </div>
    )

}

export default EditProductPage
// const EditProductPage=()=>{
//     return(
//         <div className="flex items-center">

//         </div>
//     )

// }

// export default EditProductPage