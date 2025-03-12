import Loading from "../components/loading"
import { useProducts } from "../hooks/products_hooks"
import { ProductEditCard } from "../components/productEditCard"

export const AllProductsPage= () =>{

    const{data:product = [], isLoading, isError} = useProducts()

    if(isLoading){
        return(<Loading/>)
    }

    if(product.length<=0){
        return(<div className="flex h-screen items-center justify-center  text-2xl">No hay productos registrados</div>)
    } else {
        return(        
            <div className="flex flex-col items-center justify-start p-5 space-y-2">
                {product.map((product)=>(
                    <ProductEditCard product={product}></ProductEditCard>
                ))}

            </div>
        )
    }
}

