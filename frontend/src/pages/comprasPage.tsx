import Loading from "../components/loading"
import { useOrdersUser } from "../hooks/order_hooks"
import { OrderCard } from "../components/orderCard"
import { useState } from "react"

export const MisComprasPage = () =>{

    const local = localStorage.getItem("userData")
    const userData = JSON.parse(local!)
    const [positionPage, setPosition] = useState<number>(1)
    const [limitInitial, setLimitInitial] = useState<number>(0)
    const [limitFinal, setLimitFinal] = useState<number>(3)

    const limitToShow = 3

    const{data:orders = [], isLoading} = useOrdersUser(Number(userData.id))

    const limitPage = orders.length / limitToShow
    
    const changePosition = (type:string) => {
        switch(type){
            case "+":
                setLimitInitial( e => e + limitToShow)
                setLimitFinal( e => e + limitToShow)
                setPosition( e => e + 1)
                return window.scrollTo({ top: 0, behavior: "smooth" });
            
            case "-":
                if(positionPage > 1){
                    setLimitInitial( e => e - limitToShow)
                    setLimitFinal( e => e - limitToShow)
                    setPosition( e => e - 1)
                    return window.scrollTo({ top: 0, behavior: "smooth" });
                }
        }
    }

    if(isLoading){
        return(<Loading/>)
    }

    return(
        <div className="flex flex-col space-y-2 items-center justify-center p-10 ">
            {orders.length===0 ? (
                <p className="text-4xl text-white">No tienes compras realizadas :)</p>
            ) : (
                <>
                    {orders.slice(limitInitial,limitFinal).map((order) => (
                        <OrderCard item={order} ></OrderCard>
                    ))}
                    <div className="flex space-x-2">
                        <button  onClick={() => changePosition("-")} className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${positionPage == 1 ? "invisible" : "visible"}`}> {"<"} </button>
                        <p className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${orders.length < limitToShow ? "invisible" : "visible"}`}>{positionPage}</p>
                        <button  disabled={positionPage == Math.ceil(limitPage)} onClick={() => changePosition("+")} className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${positionPage == Math.ceil(limitPage) ? "invisible" : "visible"}`}> {">"} </button>
                    </div>
                </>
            )}
        </div>
    )
}
