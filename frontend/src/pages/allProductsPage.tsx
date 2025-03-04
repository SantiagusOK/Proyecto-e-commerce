import { useEffect, useState } from "react"
import Loading from "../components/loading"
import { NavLink } from "react-router-dom"
import { useProducts } from "../hooks/products_hooks"

const AllProductsPage= () =>{

    const{data:product = [], isLoading, isError} = useProducts()

    

    if(isLoading){
        return(<Loading/>)
    }

    if(product.length<=0){
        return(<div className="flex h-screen items-center justify-center  text-2xl">No hay productos registrados</div>)
    } else {
        return(        
            <div className="flex flex-col items-center justify-start p-5">
                {product.map((product)=>(
                    <div className="bg-white flex w-200 m-0.5 items-center justify-between  ">

                        <div className="flex">
                            <div className="bg-neutral-400 h-40 w-40 flex items-center justify-center">
                                <span>{product.name[0]}</span>
                            </div>

                            <div className="flex flex-col w-lg p-2 ">
                                <span className="text-2xl">{product.name}</span>
                                <span className="text-2xl font-extralight">${product.price}</span>
                                <span className="font-medium">x {product.stockCurrent}</span>
                                <span className="font-medium">{product.category.name}</span>
                            </div>
                        </div>

                        <div className="flex-1  w-xl">
                            <NavLink to={"/inicioPage/allProductsPage/editProduct/" + product.id}>EDITAR</NavLink>
                        </div>

                    </div>
                ))}

            </div>
        )
    }
}

export default AllProductsPage