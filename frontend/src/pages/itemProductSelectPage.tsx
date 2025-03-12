import { useNavigate, useParams } from "react-router-dom"
import Loading from "../components/loading"
import { useProduct } from "../hooks/products_hooks"
import { useForm } from "react-hook-form"
import { productSelectData } from "../type/productSelectData"
import { useEffect, useState } from "react"
import { useCreateCart, useSaveItem } from "../hooks/cart_hooks"

export const  ItemProductSelect = () =>{
    
    const{register, handleSubmit, setValue, formState:{errors}} = useForm<productSelectData>()
    const navigate = useNavigate()
    const local = localStorage.getItem("userData")
    const user = JSON.parse(local!)

    const cartSaveMutation = useSaveItem()

    const[totalPrice, setTotalPrice] = useState<number>(0)
    const[quantity, setQuantity] = useState<number>(1)
    
    const{id} = useParams()
    const{data:product, isLoading, } = useProduct(Number(id)) 
    const{data:cart , error, isLoading:cartLoading} = useCreateCart(Number(user.id))

    useEffect(() => {
        if(product){
            setTotalPrice(product.price)
            setQuantity(1)
        }
    },[product])

    if(isLoading || cartLoading){
        return(<Loading/>)
    }

    if(cartSaveMutation.isSuccess){
        navigate("/inicioPage/carritoPage")
    }

    const save_item = () => {
        const product_response = {
            id_product:Number(product!.id),
            quantity:Number(quantity),
            unityPrice:totalPrice
        }

        console.log(product_response)
        cartSaveMutation.mutate({ id_user: user.id, product: product_response });
    }

    const updatePrice = (value:any) => {
        const quantityValue = Number(value.target.value)
        setValue("quantity", quantityValue, { shouldValidate: true });
        setQuantity(quantityValue)
        if(quantityValue != 0){
            const total = (product!.price * quantityValue).toFixed(2)
            setTotalPrice(Number(total))
        }
        if(quantityValue <= 0){
            setTotalPrice(Number(product?.price))
        }
    }

    return(
        <div className="basis-full flex items-center justify-center p-10">
            <div className="flex space-x-2">
                
                <div className="bg-neutral-700 rounded-3xl space-y-2 w-130 h-160">
                    <figure className="relative">

                        <p className="absolute top-85 left-5 bg-black text-white px-5 py-2 rounded">{product?.category.name}</p>
                        <img className="object-cover w-130 h-100 rounded-3xl " src={product?.urlImage} alt="" />
                    </figure>
                    <div className="p-2">
                        <p className="w-full text-center text-white font-mono">Descripcion</p>
                        <hr />
                        <p className="p-2 text-white h-47 overflow-y-auto overflow-x-visible">{product?.description}</p>
                    </div>
                </div>
                

                <div className="bg-neutral-700 w-150 h-fit p-5 rounded-2xl space-y-2">
                    <p className="w-full text-white text-2xl ">{product?.name}</p>
                    <form className="space-y-2" onSubmit={handleSubmit(save_item)}>
                        <div>
                            <p className="text-white">Cantidad</p>
                            <input {...register("quantity",{
                                required:{
                                    value:true,
                                    message:"Este campo es obligatorio"
                                },
                                validate:(e) => {
                                    if(e <= 0){
                                        return "El valor tiene que ser mayor a 1"
                                    }

                                    if(product!.stockCurrent - e < product!.stockMin){
                                        return "No puedes pedir esta catidad por ahora"
                                    }

                                    return true
                                }
                            })}className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" type="number" value={quantity} onChange={updatePrice}  />
                            {errors.quantity&&(<p className="text-red-400">❌{errors.quantity.message}</p>)}
                        </div>
                        <p className="text-white text-4xl font-bold">${totalPrice}</p>

                        <button type="submit" className="w-full bg-neutral-600 rounded py-2 transition hover:bg-neutral-500 text-white">Agregar al carrito</button>
                    </form>
                    {
                        cartSaveMutation.error&&(<p className="w-full text-center">Error al intentar guardar el item al carrito</p>)
                    }
                </div>
            </div>  
        </div>
    )
}
