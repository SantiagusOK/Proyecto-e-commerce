import { useEffect, useState } from "react"

interface productIdData{
    id_product:number
    amount:number,
    totalProduct:number
}

const ProductsItem=({id_product, amount, totalProduct}:productIdData)=>{

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

    useEffect(()=>{
        fetch("http://localhost:8000/products/"+id_product)
        .then((value)=>value.json())
        .then((data)=>{
            setProductName(data[0].name)
            setProductPrice(data[0].price)
            setproductCategory(data[0].categorie["name"])
        })
    },[])


    return(
        <div className=" flex w-full mb-0.5  space-x-5 bg-white p-4 shadow ">
            <div className="bg-neutral-500 w-40 h-40 rounded-full flex items-center justify-center text-white text-4xl">{productName[0]}</div>

            <div className="flex flex-col justify-center items-start w-90">

                <div className="flex justify-between w-full">
                    <h1>{productName}</h1>
                    <h1>[{productCategory}]</h1>
                </div>

                <div className="flex justify-between w-full">
                    <h1>Cantidad</h1>
                    <h1>x{amount}</h1>
                </div>

                <div className="flex justify-between w-full">
                    <h1>Total por cantidad</h1>
                    <h1>${totalProduct}</h1>
                </div>
                
            </div>

            

        </div>
    )
    
}

export default ProductsItem