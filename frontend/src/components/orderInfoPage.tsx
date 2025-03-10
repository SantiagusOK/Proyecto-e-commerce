import { useNavigate, useParams } from "react-router-dom"
import { useOrder } from "../hooks/order_hooks"
import Loading from "./loading"
import { ItemOrderInfoCard } from "./itemOrderInfoCard"
import { useState } from "react"

export const OrderInfoPage=()=>{
    const{id_order}=useParams()
    const navigate = useNavigate()
    const{data:order, isLoading} = useOrder(Number(id_order))
    const[loadingRealize, setLoadingRealize] = useState<boolean>(false)
    const[loadingCancel, setLoadingCancel] = useState<boolean>(false)

    const locale =  localStorage.getItem("userData")
    const user = JSON.parse(locale!)

    const setNewState = async() => {
        const id_order = order!.id
        setLoadingRealize(true)
        const response = await fetch("http://localhost:8000/order/finishOrder/" + id_order,{
            method:"PUT"
        })
        if(response.ok){
            window.location.reload();
        }
        setLoadingRealize(false)
    }

    const cancelOrder = async() => {
        const id_order = order!.id
        setLoadingCancel(true)
        const response = await fetch("http://localhost:8000/order/cancelOrder/" + id_order,{
            method:"PUT"
        })
        if(response.ok){
            window.location.reload();
        }
        setLoadingCancel(false)
    }

    if(isLoading){
        return(
            <Loading></Loading>
        )
    }

    if(!order){
        return(
            <div>
                <p>Hubo un error al cargar los datos de la orden</p>
            </div>
        )
    }

    console.log("Rol del usuario: " + user.role.roleName)
    console.log("Estado de la orden: " + order.state.name)

    return(
        <div className="p-10 flex justify-center space-x-4">
            <div className="flex w-215 h-fit justify-center space-x-20 bg-white p-2">
                <div className="space-y-2  flex-1">
                    {
                        order.items.map( item => (
                            <ItemOrderInfoCard itemOrder={item} ></ItemOrderInfoCard>
                        ) )
                    }
                </div>
            </div>

            <div className="bg-white p-5 space-y-2 w-150 h-fit">
                <div className="flex items-center justify-between">
                    <div>
                        <p>Fecha de compra</p>
                        <p className="font-bold">{order.date}</p>
                    </div>
                    <p className={`${order.state.name==="pendiente" ? "bg-amber-300" : order.state.name==="finalizado" ? "bg-green-300" : "bg-red-300"} px-7 py-2 rounded font-bold`}>{order.state.name.toUpperCase()}</p>
                </div>

                <hr />

                <div className="flex flex-col w-full">
                    <p className="w-full text-center">Datos del comprador</p>
                    <div className="flex justify-between">
                        <p>Nombre y Apellido</p>
                        <p>{order.user.fullname} {order.user.lastname}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Nombre de usuario</p>
                        <p>@{order.user.username}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Email</p>
                        <p>{order.user.email}</p>
                    </div>
                </div>

                <hr />

                <div className="flex flex-col w-full">
                    <p className="w-full text-center">Direccion</p>
                    <div className="flex justify-between">
                        <p>Pais</p>
                        <p>{order.address.country}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Estado</p>
                        <p>{order.address.state}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Ciudad</p>
                        <p>{order.address.city}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Calle</p>
                        <p>{order.address.street}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Codigo Postal</p>
                        <p>{order.address.postal_code}</p>
                    </div>
                </div>

                <div className="w-full space-y-2">
                    {
                        order.state.name === "pendiente" && user.role.roleName === "administrador" &&(
                            <button className="px-5 py-2 bg-blue-500 w-full rounded transition hover:bg-blue-800 cursor-pointer text-white flex items-center justify-center space-x-5" onClick={setNewState}>
                                {
                                    loadingRealize &&(<div className="h-5 w-5 border-2 border-r-transparent rounded-full animate-spin"></div>)
                                }
                            <span>Confirmar compra realizada</span>
                            </button>
                            
                        )
                    }


                    {
                        order.state.name !== "cancelado" &&(
                            <button className="px-5 py-2 bg-blue-500 w-full rounded transition hover:bg-blue-800 cursor-pointer text-white flex items-center justify-center space-x-3" onClick={cancelOrder}>
                                {
                                    loadingCancel &&(<div className="h-5 w-5 border-2 border-r-transparent rounded-full animate-spin"></div>)
                                }
                                <span>Cancelar compra</span>
                            </button>
                        )
                    }

                    <button className="px-5 py-2 bg-blue-500 w-full rounded transition hover:bg-blue-800 cursor-pointer text-white" onClick={()=>{navigate("/inicioPage/misComprasPage")}}>volver</button>
                    
                </div>
                
            </div>
            
        </div>
    )
}