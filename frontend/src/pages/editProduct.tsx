import { NavLink, useParams } from "react-router-dom"
import { useProduct, useProductUpdate } from "../hooks/products_hooks"
import Loading from "../components/loading"
import { useForm } from "react-hook-form"
import { productUpdate } from "../type/productUpdate"
import { useState } from "react"

export const  EditProductPage = () =>{

    const {id} = useParams()
    const{register, handleSubmit, watch,formState:{errors}} = useForm<productUpdate>()
    const productMutation = useProductUpdate()
    const{data:product, isLoading, isError} = useProduct(Number(id))
    const[isNotChange, setChanged] = useState<boolean>(false)

    if(isLoading){
        return(
            <Loading></Loading>
        )
    }

    const saveChange = (data:productUpdate) => {

        const hasChanges = (
            Number(data.price) != product?.price || 
            Number(data.stockCurrent) != product?.stockCurrent ||
            Number(data.stockMax) != product?.stockMax || 
            Number(data.stockMin) != product?.stockMin ||
            data.description != product?.description
        )

        if (hasChanges){
            setChanged(false)
            console.log("hay cambios")
            const productUpdate = {
                id:product!.id,
                price: Number(parseFloat(String(data.price))),
                stockMax: Number(data.stockMax),
                stockMin: Number(data.stockMin),
                stockCurrent: Number(data.stockCurrent),
                description: data.description
            }

            productMutation.mutate(productUpdate)

        } else {
            setChanged(true)
        }

    }

    return(
        <div className="flex justify-center items-start py-5 space-x-5">

            <div className="bg-neutral-600 p-2 h-70 w-70 rounded">
                <img className="h-full w-full object-cover rounded" src={product?.urlImage} alt="" />
            </div>

            <form className="bg-neutral-600 p-10 w-200 rounded space-y-2" onSubmit={handleSubmit(saveChange)}>
                {/* PRECIO */}
                <div>
                    <p className="text-white">Precio</p>
                    <input  {...register("price",{
                        required:{
                            value:true,
                            message:"Este campo es obligatorio"
                        },
                        validate:(value) => {
                            if(value<=0){
                                return"El valor tiene que ser mayor o igual a 1"
                            }
                            return true
                        }
                    })} className="bg-neutral-800 p-2 w-full text-white rounded transition border-2 border-neutral-500 hover:border-neutral-300" type="number" step="0.01" defaultValue={product?.price}/>
                    {errors.price&&(<p className="text-red-400 font-bold">❌{errors.price.message}</p>)}
                </div>

                {/* STOCK MINIMO */}
                <div>
                    <p className="text-white">Stock Minimo</p>
                    <input  {...register("stockMin",{
                        
                        required:{
                            value:true,
                            message:"Este campo es obligatorio"
                        },
                        validate:(value) => {
                            const stockMax = Number(watch("stockMax"))
                            if(value >= stockMax){
                                return"El valor tiene que ser menor al Stock Maximo"
                            }
                            if(value <= 0){
                                return"El valor tiene que ser mayor a 1"
                            }
                            return true
                        }
                    })} className="bg-neutral-800 p-2 w-full text-white rounded transition border-2 border-neutral-500 hover:border-neutral-300" type="number" step="0.01" defaultValue={product?.stockMin}/>
                    {errors.stockMin&&(<p className="text-red-400 font-bold">❌{errors.stockMin.message}</p>)}
                </div>

                

                {/* STOCK MAXIMO */}
                <div>
                    <p className="text-white">Stock Maximo</p>
                    <input  {...register("stockMax",{
                        required:{
                            value:true,
                            message:"Este campo es obligatorio"
                        },
                        validate:(value) => {
                            const stockMin = Number(watch("stockMin"))
                            if(value <= stockMin){
                                return"El valor tiene que ser mayor al Stock Minimo"
                            }
                            if(value <= 0){
                                return"El valor tiene que ser mayor a 1"
                            }
                            return true
                        }
                    })} className="bg-neutral-800 p-2 w-full text-white rounded transition border-2 border-neutral-500 hover:border-neutral-300" type="number" step="0.01" defaultValue={product?.stockMax}/>
                    {errors.stockMax&&(<p className="text-red-400 font-bold">❌{errors.stockMax.message}</p>)}
                </div>

                
                {/* STOCK CONCURRENTE */}
                <div>
                    <p className="text-white">Stock Concurrente</p>
                    <input  {...register("stockCurrent",{
                        
                        required:{
                            value:true,
                            message:"Este campo es obligatorio"
                        },
                        validate:(value) => {
                            const stockMax = Number(watch("stockMax"))
                            const stockMin = Number(watch("stockMin"))
                            if(value > stockMax){
                                return"El valor tiene que ser menor al Stock Maximo"
                            }
                            if(value < stockMin){
                                return"El valor tiene que ser mayor al Stock Minimo"
                            }
                            if(value <= 0){
                                return"El valor tiene que ser mayor a 1"
                            }
                            return true
                        }
                    })} className="bg-neutral-800 p-2 w-full text-white rounded transition border-2 border-neutral-500 hover:border-neutral-300" type="number" step="0.01" defaultValue={product?.stockCurrent}/>
                    {errors.stockCurrent&&(<p className="text-red-400 font-bold">❌{errors.stockCurrent.message}</p>)}
                </div>


                {/* DESCRIPCION */}
                <div>
                    <p className="text-white">Descripcion</p>
                    <textarea  {...register("description",{
                        required:{
                            value:true,
                            message:"Este campo es obligatorio"
                        },
                    })} className="bg-neutral-800 p-2 w-full text-white rounded transition border-2 border-neutral-500 hover:border-neutral-300 h-50" maxLength={200} placeholder="..." defaultValue={product?.description}></textarea>
                    {errors.description&&(<p className="text-red-400 font-bold">❌{errors.description.message}</p>)}
                </div>

                <div className="space-y-2">
                    <div>
                        {isNotChange&&(<p className="text-red-400 text-center font-bold">No hay cambios para actualizar</p>)}
                        {productMutation.isSuccess&&(<p className="text-green-400 text-center font-bold">Producto actualizado con exito</p>)}
                        {productMutation.isError&&(<p className="text-red-400 text-center font-bold">Hubo un error al intentar actualizar el producto</p>)}
                        <button className="w-full py-2 bg-neutral-700 rounded transition hover:bg-neutral-800 cursor-pointer text-white flex items-center justify-center space-x-3" type="submit">
                            {productMutation.isPending&&(<div className="h-5 w-5 border-2 rounded-full border-t-transparent border-r-transparent animate-spin"></div>)}
                            <p>Guardar cambios</p>
                        </button>
                    </div>
                    <NavLink className="w-full py-2 bg-neutral-700 rounded transition hover:bg-neutral-800 text-white flex justify-center" type="submit" to={"/inicioPage/allProductsPage"}>Volver</NavLink>
                </div>

            </form>
            
            
        </div>
    )

}