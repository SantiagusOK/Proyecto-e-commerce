import { useState } from "react"
import { OrderData } from "../type/orderData"
import { ItemOrderCard } from "./itemOrderCard"
import { NavLink } from "react-router-dom"

interface OrderSchema{
    item:OrderData
}

export const OrderCard = ({item}:OrderSchema) => {
    return (
        <div className="bg-neutral-600 p-6 w-[50%] space-y-2 rounded ">

            <div className="flex justify-between items-center">
                <p className="text-2xl text-white">{item.date}</p>
                <div className="flex space-x-1.5">
                    <p className="font-light text-white">Pedido de</p>
                    <p className="font-bold text-white">{item.user.fullname} {item.user.lastname}</p>
                </div>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-3xl bg-neutral-700 p-2">
                <p className="text-white">Total</p>
                <p className="text-white">${item.totalOrder}</p>
            </div>

            <div className="space-y-2">
                {
                item.items.slice(0, 2).map((itemOrders)=>(
                    <ItemOrderCard itemOrder={itemOrders}></ItemOrderCard>
                    ))
                }

                {
                item.items.length > 2 &&(
                    <div className=" rounded flex ">
                        <div className="bg-neutral-200 h-15 w-40 rounded-2xl flex justify-center items-center">
                            <p className="text-3xl text-black">+{item.items.length-2}</p>
                        </div>
                    </div>
                )
                }

                <div className="flex w-full justify-end space-x-3">
                    <p className={`${item.state.name==="pendiente" ? "bg-amber-300" : item.state.name==="finalizado" ? "bg-green-300" : "bg-red-300"} px-7 py-2 rounded font-bold flex items-center justify-center`}>{item.state.name.toUpperCase()}</p>

                    <NavLink  className="bg-neutral-500 h-full text-2xl p-3 px-5 rounded-[5px] font-mono cursor-pointer transition hover:bg-neutral-400 text-white" to={"/inicioPage/misComprasPage/orderInfo/" + item.id}>
                        Ver detalles
                    </NavLink>
                </div>

            </div>            
        </div>
    )
}