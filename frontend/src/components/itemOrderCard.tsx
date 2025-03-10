import { OrderItemData } from "../type/orderItemData"

interface ItemOrderSchema{
    itemOrder : OrderItemData
}
export const ItemOrderCard = ({itemOrder}:ItemOrderSchema) => {
    return (
        <div className=" rounded flex w-full ">
            <div className="bg-neutral-200 h-40 w-40 rounded-2xl flex justify-center items-center">
                <p className="text-3xl">{itemOrder.product.name[0]}</p>
            </div>
            <div className="flex-2 w-full p-2 justify-betwee">
                <div className="flex flex-col w-full ">
                    <div className="flex justify-between w-full">
                        <p className="font-medium text-4xl">{itemOrder.product.name}</p>
                        <p className="text-4xl">${itemOrder.amountTotal}</p>
                    </div>
                    
                    <p className="text-2xl font-light">Precio producto: ${itemOrder.product.price}</p>

                    {itemOrder.amount===1 ? (
                        <p className="text-2xl font-light">{itemOrder.amount} Unidad</p>
                    ) : (
                        <p className="text-2xl font-light">{itemOrder.amount} Unidades</p>
                    )}
                </div>
            </div>



        </div>
    )
}