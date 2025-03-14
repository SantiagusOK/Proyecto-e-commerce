import Loading from "../components/loading"
import { useProducts } from "../hooks/products_hooks"
import { ProductEditCard } from "../components/productEditCard"
import { useState } from "react"

export const AllProductsPage= () =>{
    const [positionPage, setPosition] = useState<number>(1)
    const [limitInitial, setLimitInitial] = useState<number>(0)
    const [limitFinal, setLimitFinal] = useState<number>(6)

    const limitToShow = 6
    
    const{data:product = [], isLoading, isError} = useProducts()

    const limitPage = product.length / limitToShow
    
    const changePosition = (type:string) => {
        switch(type){
            case "+":
                setLimitInitial( e => e + limitToShow)
                setLimitFinal( e => e + limitToShow)
                setPosition( e => e + 1)
                return window.scrollTo({ top: 0, behavior: "smooth" });
            
            case "-":
                if(positionPage > 1){
                    setLimitInitial( e => e - limitToShow)
                    setLimitFinal( e => e - limitToShow)
                    setPosition( e => e - 1)
                    return window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }

    if(isLoading){
        return(<Loading/>)
    }

    if(product.length<=0){
        return(<div className="flex h-screen items-center justify-center  text-2xl">No hay productos registrados</div>)
    } else {
        return(        
            <div className="flex flex-col items-center justify-start p-5 space-y-2">
                {product.slice(limitInitial, limitFinal).map((product)=>(
                    <ProductEditCard product={product}></ProductEditCard>
                ))}
                <div className="flex space-x-2">
                    <button  onClick={() => changePosition("-")} className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${positionPage == 1 ? "invisible" : "visible"}`}> {"<"} </button>
                    <p className="text-2xl text-white bg-neutral-600 py-1 px-5">{positionPage}</p>
                    <button  disabled={positionPage == Math.ceil(limitPage)} onClick={() => changePosition("+")} className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${positionPage == Math.ceil(limitPage) ? "invisible" : "visible"}`}> {">"} </button>
                </div>

            </div>
        )
    }
}

