import { useNavigate, useParams } from "react-router-dom"
import { useOrder, useUpdateOrderState } from "../hooks/order_hooks"
import Loading from "./loading"
import { ItemOrderInfoCard } from "./itemOrderInfoCard"
import { useState } from "react"

export const OrderInfoPage=()=>{
    const{id_order}=useParams()
    const navigate = useNavigate()
    const{data:order, isLoading} = useOrder(Number(id_order))
    const locale =  localStorage.getItem("userData")
    const user = JSON.parse(locale!)
    const orderMutation = useUpdateOrderState()
    const [typeLoading, setTypeLoading] = useState<string>("")

    const setNewState = async(state:number) => {
        orderMutation.mutate({id_order:order!.id, id_state:state})
        switch(state){
            case 2:
                return setTypeLoading("cancel")
            case 3:
                return setTypeLoading("realize")
            default:
                setTypeLoading("")
        }
    }

    if(orderMutation.isSuccess){
        window.location.reload()
    } 

    if(orderMutation.error){
        setTypeLoading("")
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

    return(
        <div className="p-10 flex justify-center space-x-4 ">
            <div className="flex h-fit justify-center space-x-20 bg-neutral-600 rounded p-2">
                <div className="space-y-2  flex-1 min-h-20 max-h-100 overflow-y-auto overflow-x-hidden px-3">
                    {
                        order.items.map( item => (
                            <ItemOrderInfoCard itemOrder={item} ></ItemOrderInfoCard>
                        ) )
                    }
                </div>
            </div>

            <div className="bg-neutral-600 p-10 space-y-2 w-150 h-fit rounded">
                <div className="flex items-center justify-between ">
                    <div>
                        <p className="text-white">Fecha de compra</p>
                        <p className="font-bold text-white">{order.date}</p>
                    </div>
                    <p className={`${order.state.name==="pendiente" ? "bg-amber-300" : order.state.name==="finalizado" ? "bg-green-300" : "bg-red-300"} px-7 py-2 rounded font-bold`}>{order.state.name.toUpperCase()}</p>
                </div>

                <hr />

                <div className="flex flex-col w-full">
                    <p className="w-full text-center text-white">Datos del comprador</p>
                    <div className="flex justify-between">
                        <p className="text-white">Nombre y Apellido</p>
                        <p className="text-white">{order.user.fullname} {order.user.lastname}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Nombre de usuario</p>
                        <p className="text-white">@{order.user.username}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Email</p>
                        <p className="text-white">{order.user.email}</p>
                    </div>
                </div>

                <hr />

                <div className="flex flex-col w-full">
                    <p className="w-full text-center text-white">Direccion</p>
                    <div className="flex justify-between">
                        <p className="text-white">Pais</p>
                        <p className="text-white">{order.address.country}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Estado</p>
                        <p className="text-white">{order.address.state}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Ciudad</p>
                        <p className="text-white">{order.address.city}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Calle</p>
                        <p className="text-white">{order.address.street}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white">Codigo Postal</p>
                        <p className="text-white">{order.address.postal_code}</p>
                    </div>
                </div>

                <div className="w-full space-y-2">
                    {
                        order.state.name === "pendiente" && user.role.roleName === "administrador" &&(
                            <button className="px-5 py-2 bg-neutral-500 w-full rounded transition hover:bg-neutral-400 cursor-pointer text-white flex items-center justify-center space-x-5" onClick={() => setNewState(3)}>
                                {
                                    typeLoading==="realize" &&(<div className="h-5 w-5 border-2 border-r-transparent rounded-full animate-spin"></div>)
                                }
                                <span>Confirmar compra realizada</span>
                            </button>
                            
                        )
                    }

                    {
                        order.state.name !== "cancelado" && order.state.name !== "finalizado" &&(
                            <button className="px-5 py-2 bg-neutral-500 w-full rounded transition hover:bg-neutral-400 cursor-pointer text-white flex items-center justify-center space-x-3" onClick={() => setNewState(2)}>
                                {
                                    typeLoading==="cancel" &&(<div className="h-5 w-5 border-2 border-r-transparent rounded-full animate-spin"></div>)
                                }
                                <span>Cancelar compra</span>
                            </button>
                        )
                    }

                    <button className="px-5 py-2 bg-neutral-500 w-full rounded transition hover:bg-neutral-400 cursor-pointer text-white" onClick={()=>{navigate("/menu/all-orders")}}>volver</button>
                    
                    {
                        orderMutation.error&&(
                            <p className="w-full text-center text-red-300">Hubo un error al intentar realizar esta accion</p>
                        )
                    }
                </div>
                
            </div>
            
        </div>
    )
}