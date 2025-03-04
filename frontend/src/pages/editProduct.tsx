import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Loading from "../components/loading"
import { useAnProducts } from "../hooks/products_hooks"
import { useForm } from "react-hook-form"

const EditProductPage = () =>{

    const {register, handleSubmit, formState:{errors}} = useForm() 

    const {id} = useParams()
    const {data:product, isError, isLoading} = useAnProducts(Number(id))

    const [nameProduct, setnameProduct] = useState<string>("")
    const [priceProduct, setPriceProduct] = useState<number>(0)
    const [stockCurrent, setStockCurrent] = useState<number>(0)
    const [stockMax, setStockMax] = useState<number>(0)
    const [description, setDescription] = useState<string>("")

    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [dataSaved, setDataSaved] = useState<boolean>(false)
    const [dataError, setDataError] = useState<boolean>(false)
    const [messageSaved, setMessageSaved] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")

    const [oldPrice, setOldPrice] = useState<number>(0)
    const [oldStockCurrent, setOldStockCurrent] = useState<number>(0)
    const [oldStockMax, setOldStockMax] = useState<number>(0)
    const [oldDescription, setOldDescription] = useState<string>("")

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)
    const idUser = user.id


    const save_Data=async()=>{
        if(oldPrice == priceProduct && oldStockCurrent === stockCurrent && oldStockMax === stockMax && oldDescription === description){
            setDataError(true)
            setMessageError("No hay valores para guardar")
        } else {
            setDataError(false)
            setDataSaved(false)
            setLoadingData(true)
            const response = await fetch("http://localhost:8000/product/updateProduct",{
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify({
                    id:Number(id),
                    price:priceProduct, 
                    stockCurrent:stockCurrent,
                    description:description,
                    stockMax:stockMax
                })
            })

            if(response.status == 200){
                const data = await response.json()
                setMessageSaved(data.detail)
                setDataSaved(true)
                setLoadingData(false)
            } else {
                setLoadingData(false)
            }
        }
    }

    useEffect(()=>{
        if(product){
            
            setnameProduct(product.name)
            setPriceProduct(product.price)
            setStockCurrent(product.stockCurrent)
            setStockMax(product.stockMax)
            setDescription(product.description)

            setOldDescription(product.description)
            setOldPrice(product.price)
            setOldStockCurrent(product.stockCurrent)
            setOldStockMax(product.stockMax)
        }
        
    },[product])


    const onChangePrice=(e)=>{
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
          setPriceProduct(value);
        }
      }
    
    const onChangeStockCurrent=(e)=>{
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
          setStockCurrent(value);
        }
    }

    if(isLoading){
        return(<Loading/>)
    }

    if(isError){
        return(
            <div>
                <span>ERROR</span>
            </div>
        )
    }

    console.log("id_product: " + id)

    return(
        <div className="basis-full flex items-center justify-center">
            {/* CUADRADO */}
            <div className=" flex flex-col bg-white h-fit w-200 space-y-5 p-10 rounded-b-4xl shadow" >

                {/* FOTO */}
                <div className="flex flex-col items-center ">
                    <div className="w-50 h-50 bg-neutral-700 rounded-full flex items-center justify-center text-6xl text-white">
                        {nameProduct[0]}
                    </div>
                    <div className="flex flex-col items-center ">
                        <h1 className="text-4xl font-extrabold">{nameProduct}</h1>
                        <h1 className="font-black">[ {product?.category.name} ]</h1> 
                    </div>   
                </div>

                
                <div className="space-y-3">
                    <div className=" flex flex-col">
                        {/* PRECIO DEL PRODUCTO */}   
                        <span>Precio</span>
                        <div className="border-2 p-2 w-full rounded-2xl border-neutral-400 flex text-4xl">
                            <span className="text-neutral-400">$: </span>
                            <input type="text" className="outline-none w-full" placeholder="" value={priceProduct} minLength={0} onChange={onChangePrice}/>
                        </div> 
                    </div>

                    <div className=" flex flex-col">
                        
                        <span className="">Stock Concurrente</span>
                        <div className="border-2 p-2 w-full rounded-2xl border-neutral-400 flex text-4xl">
                            <span className="text-neutral-400">x:</span>
                            <input  type="text" className="outline-none w-full" value={stockCurrent} onChange={(e)=>setStockCurrent(Number(e.target.value))}/>
                        </div> 
                    </div>

                    <div className=" flex flex-col ">
                        <span className="">Stock Max</span>
                        <div className="border-2 p-2 w-full rounded-2xl border-neutral-400 flex text-4xl">
                            <span className="text-neutral-400">x:</span>
                            <input type="number" className="outline-none w-full"  value={stockMax} onChange={(e)=>setStockMax(Number(e.target.value))}/>
                        </div> 
                    </div>

                    {/* DESCRIPCION */}
                    <div className='flex flex-col w-full'>
                        <span>Descripcion</span>
                        <div className='border-2 border-neutral-400 rounded-2xl p-2 w-full'>
                            <textarea  className='resize  h-full outline-none w-full' value={description} onChange={(e)=>setDescription(e.target.value)} maxLength={200}></textarea>
                        </div>
                    </div>
                </div>

                {/* BOTONES DE GUARDAR O CANCELAR*/}
                <div className="flex space-y-4 w-full  flex-col">
                    {dataError && (<span className="w-full text-red-500 font-black text-center">{messageError}</span>)}
                    {dataSaved && (<span className="w-full text-green-600 font-black text-center">DATOS GUARDADOS</span>)}
                    <button className="h-20 rounded-3xl font-medium cursor-pointer flex items-center justify-center bg-blue-300 text-white transition duration-300 hover:bg-blue-600" onClick={save_Data}>
                        {loadingData &&(
                        <div className="h-10 w-10 border-4 border-b-blue-500 border-transparent rounded-full animate-spin mr-5"></div>  
                        )}
                        GURDAR CAMBIOS
                    </button>
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