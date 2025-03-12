import { useNavigate } from "react-router-dom"
import { ProductData } from "../type/productData"

interface getProduct{
    product:ProductData
}

const ItemProducts=({product}:getProduct)=>{

    const navigate = useNavigate()

    const handleSubmit = () => {
        if(product.stockCurrent > product.stockMin){
            navigate("/inicioPage/itemBuy/" + product.id)
        }
    }

    return(
        <div onClick={handleSubmit} className=" shadow duration-300 bg-neutral-700 hover:bg-black hover:scale-102  cursor-pointer text-white rounded h-103 flex flex-col jusbe">
            
            <figure className="relative">
                <p className="absolute top-62 left-2 text-white p-2 bg-black rounded px-5">{product.category.name}</p>
                {product.stockCurrent <= product.stockMin&&(<p className="absolute bg-red-500 w-full rounded-t text-2xl text-center ">Sin stock</p>)}    
            </figure>

            <img className="w-full h-75 bg-neutral-500 rounded-t object-cover" src={product.urlImage} />
            <p className="text-white text-2xl p-2 flex-1">{product.name}</p>
            <p className="text-white font-bold text-2xl    p-2">$  {product.price}</p>            
        </div>
    )
}

export default ItemProducts