import Loading from "../components/loading"
import { useOrdersUser } from "../hooks/order_hooks"
import { OrderCard } from "../components/orderCard"
import { OrderData } from "../type/orderData"
import { UserData } from "../type/userData"

export const ComprasPage = () =>{

    const local = localStorage.getItem("userData")
    const userData = JSON.parse(local!)

    const{data:orders = [], isLoading} = useOrdersUser(Number(userData.id))

    if(isLoading){
        return(<Loading/>)
    }

    console.log(orders)

    return(
        <div className="flex flex-col space-y-2 items-center justify-center p-10 ">
            {orders.length===0 ? (
                <p className="text-4xl">No tienes compras realizadas :)</p>
            ) : (
                orders.map((order) => (
                    <OrderCard item={order} ></OrderCard>
                ))
            )}
        </div>
    )
}
