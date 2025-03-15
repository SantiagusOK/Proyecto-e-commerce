import { OrderItemData } from "../type/orderItemData"

interface ItemOrderSchema{
    itemOrder : OrderItemData
}
export const ItemOrderCard = ({itemOrder}:ItemOrderSchema) => {
    return (
        <div className=" rounded flex w-full bg-neutral-700 p-2 border-b-3 border-neutral-500">
            <img className="w-30 h-30 object-cover rounded-2xl" src={itemOrder.product.urlImage} alt="" />
            <div className="flex-2 w-full p-2 justify-betwee">
                <div className="flex flex-col w-full ">
                    <div className="flex justify-between w-full">
                        <p className="font-medium text-2xl text-white">{itemOrder.product.name}</p>
                        <p className="text-2xl text-white">${itemOrder.amountTotal}</p>
                    </div>
                    
                    {itemOrder.amount===1 ? (
                        <p className="text-2xl font-light text-white">{itemOrder.amount} Unidad</p>
                    ) : (
                        <p className="text-2xl font-light text-white">{itemOrder.amount} Unidades</p>
                    )}
                </div>
            </div>



        </div>
    )
}