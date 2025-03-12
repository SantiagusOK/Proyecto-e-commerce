import { OrderItemData } from "../type/orderItemData"

interface ItemOrderSchema{
    itemOrder : OrderItemData
}
export const ItemOrderCard = ({itemOrder}:ItemOrderSchema) => {
    return (
        <div className=" rounded flex w-full bg-neutral-700 p-2 border-b-3 border-neutral-500">
            <div className="bg-neutral-200 h-40 w-40 rounded flex justify-center items-center">
                <img className="w-full h-full object-cover rounded" src={itemOrder.product.urlImage} alt="" />
            </div>
            <div className="flex-2 w-full p-2 justify-betwee">
                <div className="flex flex-col w-full ">
                    <div className="flex justify-between w-full">
                        <p className="font-medium text-4xl text-white">{itemOrder.product.name}</p>
                        <p className="text-4xl text-white">${itemOrder.amountTotal}</p>
                    </div>
                    
                    <p className="text-2xl font-light text-white">Precio producto: ${itemOrder.product.price}</p>

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