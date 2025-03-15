import { OrderItemData } from "../type/orderItemData"

interface ItemOrderSchema{
    itemOrder : OrderItemData
}
export const ItemOrderInfoCard = ({itemOrder}:ItemOrderSchema) => {
    return (
        <div className=" rounded flex w-200 text-white px-5 ">
            <img className="w-30 h-30 object-cover rounded-2xl" src={itemOrder.product.urlImage} alt="" />
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