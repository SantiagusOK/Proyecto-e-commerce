import { useForm } from "react-hook-form"
import { useCategories } from "../hooks/category_hooks"
import Loading from "../components/loading"
import { useState } from "react"
import { productRegisterData } from "../type/productRegisterData"
import {  useRegisterProduct } from "../hooks/products_hooks"

export const RegisterProductPage = () => {

    const{data:categories = [], error, isLoading, isError} = useCategories()
    const[id_category, setIdCategory] = useState<number>(0)
    const[urlImage, loadUrlImage] = useState<string>("")
    const[url, setUrlImage] = useState<string>("")

    const productMutation = useRegisterProduct()

    // if(isError){
    //     return(
    //         <div>
    //             hola
    //         </div>
    //     )
    // }

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
      } =useForm<productRegisterData>()

    const registerProduct = (anProduct:productRegisterData) => {
        
        const anCategory = categories.find((c) => c.id == id_category)

        const productSchema = {
            name:anProduct.name,
            price:parseFloat(String(anProduct.precio)),
            stockMax:parseFloat(String(anProduct.stockMax)),
            stockMin:parseFloat(String(anProduct.stockMin)),
            stockCurrent:parseFloat(String(anProduct.stockCurrent)),
            description:anProduct.description,
            urlImage:anProduct.urlImage
        }

        const productResponse = {
            product: productSchema,
            category: anCategory
        }

        console.log(productResponse)

        productMutation.mutate(productResponse)
    }

    const loadImage = () => {
        loadUrlImage(url)
    }

    const deleteImage = () => {
        loadUrlImage("")
    }

    const validateStockMax = (value:number) => {
        const stockMin = Number(watch("stockMin"))
        if(value<=0){
            return "❌El valor tiene que ser mayor a 0"
        } 

        if(value === stockMin){
            return "❌El stock maximo no tiene que ser igual al minimo"
        } 

        if(value < stockMin){
            return "❌EL stock maximo tiene que ser mayor al stock minimo"
        }
    }

    const validateStockMin = (value:number) => {
        const stockMax = Number(watch("stockMax"))
        if(value<=0){
            return "❌El valor tiene que ser mayor a 0"
        } 
        
        if(value == stockMax){
            return "❌El stock minimo no tiene que ser igual al minimo"
        } 

        if(value > stockMax){
            return "❌EL stock minimo tiene que ser menor al stock maximo"
        }
    }

    const validateStockCurrent = (value:number) => {
        const stockMin = Number(watch("stockMin"))
        const stockMax = Number(watch("stockMax"))

        if(value > stockMax){
            return("❌El stock tiene que ser menor al stock maximo")
        }

        if(value < stockMin){
            return("❌El stock tiene que ser mayor al stock minimo")
        }
    }

    if(isLoading){
        return(
            <Loading/>
        )
    }

    // useEffect(()=>{
    //     if()
    // })

    return (
        <div className="flex flex-col items-star justify-center py-10 space-y-10">

            <p className="text-white  w-full text-center text-4xl font-mono">Registrar un producto</p>

            <div className="flex justify-center items-star space-x-5">

                <div className="bg-neutral-600 h-fit w-100 p-5 space-y-5 rounded">

                   {
                    urlImage ? ( 
                        <img className="bg-neutral-700 w-full h-100 rounded-2xl object-cover" src={urlImage}/>
                    ) : (
                        <div className="bg-neutral-700 w-full h-100 rounded-2xl flex"></div>
                    )
                   }

                    <div className="w-full flex flex-col">
                        <p className="text-white">Url de la imagen</p>
                        <div className="space-y-2">
                            <div className="flex flex-col">
                                <input {...register("urlImage",{
                                    required:{
                                        value:true,
                                        message:"❌Este campo es obligatorio"
                                    }
                                })} onChange={(e)=>setUrlImage(e.target.value)} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300" type="text"/>
                                {errors.urlImage &&(<p className="text-red-300">{errors.urlImage.message}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="space-x-2">
                        <button className="bg-neutral-500 px-10 rounded" onClick={loadImage} >Cargar</button>
                        <button className="bg-neutral-500 px-10 rounded" onClick={deleteImage} >Eliminar</button>
                    </div>
                </div>

                <form className="bg-neutral-600 p-5 rounded space-y-5 w-[50%]" onSubmit={handleSubmit(registerProduct)}>
                    {/* NOMBRE Y CATEGORIA */}
                    <div className="w-full flex space-x-5  items-start justify-center">
                        {/* NOMBRE */}
                        <div className="w-full">
                            <p className="text-white">Nombre</p>
                            <input {...register("name",{
                                required:{
                                    value:true,
                                    message:"❌Este campo es obligatorio"
                                }
                            })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300" type="text"/>
                            {errors.name &&(<p className="text-red-300">{errors.name.message}</p>)}
                        </div>

                        {/* CATEGORIA */}
                        <div className="">
                            <p className="text-white">Categoria</p>
                            <select {...register("id_category",{
                                validate:(e) => {
                                    if(e == 0){
                                        return "❌Seleccione una categoria"
                                    }
                                    return true
                                }
                            })} className="w-50 bg-neutral-700 text-white p-2 border-2 border-neutral-500 rounded hover:border-neutral-300" onChange={(e) => setIdCategory(Number(e.target.value))}>
                                <option value={0}>...</option>
                                {
                                    categories && (
                                        categories.map((categorie) => (
                                            <option value={categorie.id}>{categorie.name.toUpperCase()}</option>
                                        ))
                                    )
                                }
                            </select>
                            {errors.id_category &&(<p className="text-red-300">{errors.id_category.message}</p>)}
                        </div>

                    </div>
                        
                    
                    {/* PRECIO */}
                    <div>
                        <p className="text-white">Precio</p>
                        <input {...register("precio",{
                            required:{
                                value:true,
                                message:"❌Este campo es obligatorio"
                            },
                            validate:(value) => {
                                if(value<0){
                                    return "El valor tiene que ser numeros positivos"
                                }else if(value == 0){
                                    return "El valor tiene que ser mayor a 0"
                                }
                            }
                        })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300" type="number" step="0.01" min="0" placeholder="$0.00"/>
                        {errors.precio &&(<p className="text-red-300">{errors.precio.message}</p>)}
                    </div>

                    {/* STOCK MAXIMO */}
                    <div>
                        <p className="text-white">Stock Maximo</p>
                        <input {...register("stockMax",{
                            required:{
                                value:true,
                                message:"❌Este campo es obligatorio"
                            },
                            validate:validateStockMax
                        })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300" type="number" step="0.01" min="0" placeholder="x0"/>
                        {errors.stockMax &&(<p className="text-red-300">{errors.stockMax.message}</p>)}
                    </div>

                    {/* STOCK MINIMO */}
                    <div>
                        <p className="text-white">Stock Minimo</p>
                        <input {...register("stockMin",{
                            required:{
                                value:true,
                                message:"❌Este campo es obligatorio"
                            },
                            validate: validateStockMin
                        })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300" type="number" step="0.01" min="0" placeholder="x0"/>
                        {errors.stockMin &&(<p className="text-red-300">{errors.stockMin.message}</p>)}
                    </div>

                    {/* STOCK CONCURRENTE */}
                    <div>
                        <p className="text-white">Stock Concurrente</p>
                        <input {...register("stockCurrent",{
                            required:{
                                value:true,
                                message:"❌Este campo es obligatorio"
                            },
                            validate: validateStockCurrent
                        })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300" type="number" step="0.01" min="0" placeholder="x0"/>
                        {errors.stockCurrent &&(<p className="text-red-300">{errors.stockCurrent.message}</p>)}
                    </div>

                    {/* DESCRICION */}
                    <div>
                        <p className="text-white">Descripcion</p>
                        <textarea {...register("description",{
                            required:{
                                value:true,
                                message:"❌Este campo es obligatorio"
                            }
                        })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300 h-30" placeholder="..."></textarea>
                        {errors.description &&(<p className="text-red-300">{errors.description.message}</p>)}
                    </div>

                    {
                        productMutation.isSuccess&&(<p className="w-full text-center text-green-600 font-medium">Producto registrado con exito</p>)
                    }

                    <button className="w-full bg-neutral-500 py-3 transition hover:bg-neutral-400 cursor-pointer flex items-center justify-center space-x-5" type="submit">
                        {productMutation.isPending&&(<div className="h-5 w-5 border-2 border-t-transparent border-l-transparent rounded-full border-white animate-spin"></div>)}
                        <p>Registrar producto</p>
                    </button>

                </form>
            </div>

        </div>
    )
}
