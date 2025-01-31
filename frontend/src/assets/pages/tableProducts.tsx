import { useEffect, useState } from "react"

interface categorieData{
    id:number,
    name:string
}

interface listProductsData{
    id:number,
    name:string,
    price:number,
    categorie:categorieData
}

const TableProducts= () =>{

    const [listProducts, setListProducts] = useState<listProductsData[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{
        fetch("http://localhost:8000/products/getAllProducts+categories")
        .then((values) => values.json())
        .then((data) => setListProducts(data))
    },[])





    return(        
        <div className=" text-left h-screen flex flex-col items-center pb-10 pt-10">
            <table className=" h-fit w-fit" >
                <thead>
                    <tr>
                        <th className="bg-neutral-500 w-fit p-5 border-2">ID</th>
                        <th className="bg-neutral-500 w-fit p-5 border-2">NOMBRE DEL PRODUCTO</th>
                        <th className="bg-neutral-500 w-fit p-5 border-2">PRECIO</th>
                        <th className="bg-neutral-500 w-fit p-5 border-2">CATEGORIA</th>
                    </tr> 
                </thead>
                <tbody>
                    {listProducts.map((product)=>(
                        <tr>
                            <th className="bg-neutral-300 w-fit p-5 border-2">{product.id}</th>
                            <th className="bg-neutral-300 w-fit p-5 border-2">{product.name}</th>
                            <th className="bg-neutral-300 w-fit p-5 border-2">${product.price}</th>
                            <th className="bg-neutral-300 w-fit p-5 border-2">{product.categorie.name}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )



}

export default TableProducts