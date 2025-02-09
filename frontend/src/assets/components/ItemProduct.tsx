import { NavLink } from "react-router-dom"

interface productData{
    id:number,
    name:string,
    price:number
}


const ItemProducts=({id,name,price}:productData)=>{
    
    return(
        <NavLink to={"/inicioPage/itemBuy/"+String(id)} className="w-215 p-3 shadow bg-white border-neutral-300 flex items-center transition duration-300  hover:bg-blue-200 hover:scale-104 cursor-pointer">
            <div className="flex items-center space-x-4 ">
               <div className="bg-neutral-400 rounded-2xl w-50 h-50 flex items-center justify-center text-4xl font-extrabold ">
                {name[0]}
               </div>
               <div className="space-y-5">
                <h1 className="text-2xl font-normal">{name} </h1>
                <h1 className="text-2xl font-medium">$ {price} </h1>
               </div>    
            </div>
        </NavLink>
    )
}

export default ItemProducts