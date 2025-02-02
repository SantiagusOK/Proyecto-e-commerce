import { NavLink } from "react-router-dom"

interface productData{
    id:number,
    name:string,
    price:number
}
const ItemProducts=({id,name,price}:productData)=>{
    return(
        <NavLink to={"/itemBuy/"+String(id)} className="w-215 bg-white p-3 rounded-2xl flex items-center transition duration-300  hover:bg-blue-200 hover:scale-104 cursor-pointer border-2 ">
            <div className="flex items-center space-x-4 ">
               <div className="bg-neutral-400 rounded-full w-30 h-30 flex items-center justify-center text-4xl font-extrabold ">
                {name[0]}
               </div>
               <div>
                <h1 className="text-2xl font-bold">{name} </h1>
                <h1 className="text-2xl text-green-700 font-extrabold">${price} </h1>
               </div>    
            </div>
        </NavLink>
    )
}

export default ItemProducts