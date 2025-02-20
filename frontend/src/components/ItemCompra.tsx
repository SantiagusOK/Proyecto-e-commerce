import { useEffect, useState } from "react"
import Loading from "./loading"


interface categorie{
    id:number
    name:string
}

interface itemProduct{
    cantidad:number
    total_por_cantidad:number
    id_product:number
}

interface itemData{
    AnProduct:itemProduct
}

interface ProductData{
    idProduct: number,
    name: string,
    stock: number,
    price: number,
    category: categorie
}

const ProductsItem=({AnProduct}:itemData)=>{

    const [products, setProducts] = useState<ProductData>()
    const [loading, setLoading] = useState<boolean>(false)

    const get_products = async () => {
        setLoading(true)
        const response = await fetch("http://localhost:8000/products/" + AnProduct.id_product).then((value)=>value.json()).then((data)=>{
            setProducts(data)
        })
        setLoading(false)
    }

    useEffect(()=>{
        get_products()
    },[])


    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        <div className=" flex w-full mb-0.5  space-x-5 bg-white p-4 shadow ">
            <div className="bg-neutral-500 w-40 h-40 rounded-full flex items-center justify-center text-white text-4xl">
                {products?.name[0]}
            </div>

            <div className="flex flex-col justify-center items-start w-90">

                <div className="flex justify-between w-full">
                    <h1>{products?.name}</h1>
                    <h1>[{products?.category.name}]</h1>
                </div>

                {/* <div className="flex justify-between w-full">
                    <h1>Cantidad</h1>
                    <h1>x{AnProduct.cantidad}</h1>
                </div> */}

                <div className="flex justify-between w-full">
                    <h1>Total por cantidad</h1>
                    <h1>${AnProduct.total_por_cantidad}</h1>
                </div>
                
            </div>

            

        </div>
    )
    
}

export default ProductsItem