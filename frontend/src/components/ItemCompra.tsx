import { useEffect, useState } from "react"


interface itemProduct{
    name:string
    cantidad:number
    totalCantidad:number
    categoria:string
}

interface productData{
    product:itemProduct
}

const ProductsItem=({product}:productData)=>{

    interface CategorieData{
        name:string
    }

    interface ProductsItemData{
        name:string,
        price:number,
        categorie:CategorieData
    }

    const[productName, setProductName]=useState<string>("")
    const[productCategory, setproductCategory]=useState<string>("")
    const[productPrice, setProductPrice]=useState<number>(0)

    return(
        <div className=" flex w-full mb-0.5  space-x-5 bg-white p-4 shadow ">
            <div className="bg-neutral-500 w-40 h-40 rounded-full flex items-center justify-center text-white text-4xl">{product.name[0]}</div>

            <div className="flex flex-col justify-center items-start w-90">

                <div className="flex justify-between w-full">
                    <h1>{product.name}</h1>
                    <h1>[{product.categoria}]</h1>
                </div>

                <div className="flex justify-between w-full">
                    <h1>Cantidad</h1>
                    <h1>x{product.cantidad}</h1>
                </div>

                <div className="flex justify-between w-full">
                    <h1>Total por cantidad</h1>
                    <h1>${product.totalCantidad}</h1>
                </div>
                
            </div>

            

        </div>
    )
    
}

export default ProductsItem