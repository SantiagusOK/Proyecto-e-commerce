import { NavLink } from "react-router-dom"
import { ProductData } from "../type/productData"

interface getProduct{
    product:ProductData
}

const ItemProducts=({product}:getProduct)=>{
    return(
        <NavLink to={product.stockCurrent<=0 ? "" : "/inicioPage/itemBuy/"+product.id} className="w-215 shadow bg-neutral-700 flex items-center transition duration-300 hover:bg-neutral-900 hover:scale-102  cursor-pointer text-white rounded-2xl">
            <div className="flex items-center justify-between w-full ">
                <div className="flex items-center space-x-4 ">
                    
                    <div className="bg-black rounded-l-2xl w-30 h-30 flex items-center justify-center text-4xl font-extrabold ">
                        <span className="text-white">{product.name[0]}</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl font-normal">{product.name}</h1>
                        <h1 className="text-2xl font-extralight">${product.price}</h1>
                    </div>

                </div>
               
               {product.stockCurrent <= 0 &&(
                    <div className="w-100 flex justify-end  pr-5">
                        <span className="bg-red-400 p-5 pt-1 pb-1 text-white font-black rounded-2xl">SIN STOCK</span>
                    </div>
               )}  
            </div>
        </NavLink>
    )
}

export default ItemProducts