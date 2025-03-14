import { useNavigate, useParams } from "react-router-dom"
import Loading from "../components/loading"
import { useForm } from "react-hook-form"
import { productSelectData } from "../type/productSelectData"
import { useEffect, useState } from "react"
import { useItemCart, useUpdateItemCart } from "../hooks/cart_hooks"

export const  EditItemProductSelect = () =>{
    
    const{register, handleSubmit, setValue, formState:{errors}} = useForm<productSelectData>()
    const navigate = useNavigate()
    const local = localStorage.getItem("userData")
    const user = JSON.parse(local!)
    
    const[totalPrice, setTotalPrice] = useState<number>(0)
    const[quantity, setQuantity] = useState<number>(1)
    
    const{id_item} = useParams()
    console.log("ID_ITEM => " + id_item)
    const cartUpdateItem = useUpdateItemCart()

    const{data:itemProduct, isLoading, } = useItemCart(Number(id_item)) 
    
    useEffect(() => {
        if(itemProduct){
            setTotalPrice(itemProduct.unityPrice)
            setQuantity(itemProduct.quantity)
        }
    },[itemProduct])

    if(isLoading){
        return(
            <Loading></Loading>
        )
    }

    if(cartUpdateItem.isSuccess){
        navigate("/inicioPage/carritoPage")
    }

    const save_item = (data:any) => {

        const product_response = {
            quantity:Number(quantity),
            unityPrice:totalPrice
        }

        console.log(data)
        cartUpdateItem.mutate({ id_item: Number(id_item), itemUpdate: product_response });
    }

    const updatePrice = (value:any) => {
        const quantityValue = Number(value.target.value)
        setValue("quantity", quantityValue, { shouldValidate: true });
        setQuantity(quantityValue)
        if(quantityValue != 0){
            const total = (itemProduct!.product.price * quantityValue).toFixed(2)
            setTotalPrice(Number(total))
        }
        if(quantityValue <= 0){
            setTotalPrice(Number(itemProduct!.product.price))
        }
    }

    return(
        <div className="basis-full flex items-center justify-center p-10">
            <div className="flex space-x-2">
                
                <div className="bg-neutral-700 rounded-3xl space-y-2 w-130 h-160">
                    <figure className="relative">

                        <p className="absolute top-85 left-5 bg-black text-white px-5 py-2 rounded">{itemProduct!.product.category.name}</p>
                        <img className="object-cover w-130 h-100 rounded-3xl " src={itemProduct!.product.urlImage} alt="" />
                    </figure>
                    <div className="p-2">
                        <p className="w-full text-center text-white font-mono">Descripcion</p>
                        <hr />
                        <p className="p-2 text-white h-47 overflow-y-auto overflow-x-visible">{itemProduct!.product.description}</p>
                    </div>
                </div>
                

                <div className="bg-neutral-700 w-150 h-fit p-5 rounded-2xl space-y-2">
                    <p className="w-full text-white text-2xl ">{itemProduct!.product.name}</p>
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

                                    if(itemProduct!.product.stockCurrent - e < itemProduct!.product.stockMin){
                                        return "No puedes pedir esta catidad por ahora"
                                    }

                                    return true
                                }
                            })}className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" type="number" value={quantity} onChange={updatePrice}  />
                            {errors.quantity&&(<p className="text-red-400">❌{errors.quantity.message}</p>)}
                        </div>
                        <p className="text-white text-4xl font-bold">${totalPrice}</p>

                        <button type="submit" className="w-full bg-neutral-600 rounded py-2 transition hover:bg-neutral-500 text-white flex items-center justify-center space-x-3 cursor-pointer">
                            {
                                cartUpdateItem.isPending&&(<div className="w-5 h-5 border-2 border-t-transparent border-l-transparent rounded-full animate-spin"></div>)
                            }
                            <p>Guardar cambios</p>
                        </button>
                    </form>
                    {
                        cartUpdateItem.error&&(<p className="w-full text-center">Error al intentar guardar el item al carrito</p>)
                    }
                </div>
            </div>  
        </div>
    )
}
