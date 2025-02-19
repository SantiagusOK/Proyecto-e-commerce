import { NavLink } from "react-router-dom"

interface productData{
    idProduct:number,
    name:string,
    price:number
    stock: number
}

interface product{
    product:productData
}


const ItemProducts=({product}:product)=>{
    return(
        <NavLink to={product.stock<=0 ? "" : "/inicioPage/itemBuy/"+String(product.idProduct)} className="w-215 shadow bg-white border border-neutral-300 flex items-center transition   hover:bg-blue-200  cursor-pointer">
            <div className="flex items-center justify-between w-full ">
                <div className="flex items-center space-x-4 p-3">
                    <div className="bg-neutral-400 rounded-full w-30 h-30 flex items-center justify-center text-4xl font-extrabold ">{product.name[0]}</div>
                    <div className="space-y-3">
                        <h1 className="text-2xl font-normal">{product.name}</h1>
                        <h1 className="text-2xl font-extralight">${product.price}</h1>
                    </div>
                </div>
               
               {product.stock <= 0 &&(
                    <div className="w-100 flex justify-end  pr-5">
                        <span className="bg-red-400 p-5 pt-1 pb-1 text-white font-black rounded-2xl">SIN STOCK</span>
                    </div>
               )}  
            </div>
        </NavLink>
    )
}

export default ItemProducts