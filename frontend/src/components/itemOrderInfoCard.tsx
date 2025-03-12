import { OrderItemData } from "../type/orderItemData"

interface ItemOrderSchema{
    itemOrder : OrderItemData
}
export const ItemOrderInfoCard = ({itemOrder}:ItemOrderSchema) => {
    return (
        <div className=" rounded flex w-full text-white">
            <div className="bg-neutral-200 h-40 w-40 rounded-2xl flex justify-center items-center">
                <img className="w-full h-full object-cover rounded-2xl" src={itemOrder.product.urlImage} alt="" />
            </div>
            <div className="flex-2 w-full px-2">
                <div className="flex flex-col w-full ">
                    <div className="flex justify-between w-full">
                        <p className="font-bold text-2xl">{itemOrder.product.name}</p>
                        <p className="text-2xl">${itemOrder.amountTotal}</p>
                    </div>
                    
                    <p className="text-xl">Precio producto: ${itemOrder.product.price}</p>

                    <p className="text-xl">Categoria: {itemOrder.product.category.name.toUpperCase()}</p>


                    {itemOrder.amount===1 ? (
                        <p className="text-xl">{itemOrder.amount} Unidad</p>
                    ) : (
                        <p className="text-xl">{itemOrder.amount} Unidades</p>
                    )}
                </div>
            </div>



        </div>
    )
}