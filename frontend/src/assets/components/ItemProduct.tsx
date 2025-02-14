import { NavLink } from "react-router-dom"

interface productData{
    id:number,
    name:string,
    price:number
    stock: number
}

interface product{
    product:productData
}


const ItemProducts=({product}:product)=>{
    return(
        <NavLink to={product.stock<=0 ? "" : "/inicioPage/itemBuy/"+String(product.id)} className="w-215 p-3 shadow bg-white border border-neutral-300 flex items-center transition duration-300  hover:bg-blue-200 hover:scale-104 cursor-pointer">
            <div className="flex items-center space-x-4">
               <div className="bg-neutral-400 rounded-full w-30 h-30 flex items-center justify-center text-4xl font-extrabold ">
                {product.name[0]}
               </div>
               <div className="space-y-3">
                    <h1 className="text-2xl font-normal">{product.name} </h1>
                    <h1 className="text-2xl font-extralight">${product.price} </h1>
               </div>
               {product.stock <= 0 &&(
                    <div className="w-100 flex justify-end">
                        <span className="bg-red-400 p-5 pt-1 pb-1 text-white font-black rotate-20">SIN STOCK</span>
                    </div>
               )}  
            </div>
        </NavLink>
    )
}

export default ItemProducts