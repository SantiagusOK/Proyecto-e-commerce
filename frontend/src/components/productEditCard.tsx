import { NavLink } from "react-router-dom"
import { ProductData } from "../type/productData"

interface productResponse {
    product: ProductData
}

export const ProductEditCard = ({product} : productResponse) => {
  return (
    <NavLink  className="bg-neutral-600 flex w-200 rounded transition hover:scale-102" to={"/menu/products/edit-product/" + product.id}>

        <div className="w-50 h-50 p-2 flex">
            <figure className="relative">
                <p className="absolute top-40 left-0 bg-black text-white px-2 rounded-bl rounded-tr">{product.category.name}</p>
            </figure>
            <img className="object-cover w-full h-full rounded" src={product.urlImage} alt="" />
        </div>
        
        <div className="p-5 flex-4">
            <p className="w-full text-white text-2xl">{product.name}</p>
            <p className="w-full text-white text-2xl">${product.price}</p>
            <p className="w-full text-white text-2xl">stockTotal: x{product.stockCurrent}</p>
        </div>
    </NavLink >
  )
}
