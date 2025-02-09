import { useEffect, useState } from "react"
import ItemProductsCart from "../components/ItemProductsCart"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"





interface CategorieData{
    id:number,
    name:string
}

interface ProductsData{
    id:number,
    name:string,
    stock:number,
    price:number,
    categorie:CategorieData

}

interface ProductsCartData{
    id_product:number,
    id:number,
    total:number,
    amount:number
}

const CarritoPage = () =>{

    const[productsItem, setProductsItem] = useState<ProductsCartData[]>([])
    const[totalCart, setTotalCart] = useState<number>(0)
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const nameUSer = useSelector((state:RootState)=>state.user.fullname)
    const lastnameUSer = useSelector((state:RootState)=>state.user.lastname)
    const directionUser = useSelector((state:RootState)=>state.user.direccion)

    useEffect(()=>{
       
        fetch("http://localhost:8000/users/getCarrito")
        .then((data)=>data.json())
        .then((items)=>{
            setProductsItem(items)
            const total = items.reduce((acc: any, item: { total: any }) => acc + item.total, 0);
            setTotalCart(total.toFixed(2));
            
        })
       
    },[])


    const realizeBuy=async()=>{
        setLoading(true)
        const fecha = new Date()
        const fechaStr = fecha.toLocaleString()
        const response = await fetch("http://localhost:8000/users/realizeABuy/1",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id_user:1, 
                comprasList:productsItem, 
                fechaDeCompra:fechaStr,
                totalCompra:Number(totalCart),})
        })

        const data = await response.json()

        if (data.state){
            navigate("/inicioPage/compraRealizadaPage")
        } else{
            setLoading(false)
        }
    }



    if(productsItem.length>0){
        
        return(
            <div className="h-full flex items-center p-10">
                
                <div className={`h-200 space-y-9 rounded-2xl p-2 ${productsItem.length>3 ? 'overflow-y-scroll' : 'h-auto'}`}>
                    {productsItem.map((products)=>(
                            <ItemProductsCart id_product={products.id_product} total={products.total} amount={products.amount} id={products.id}/>
                        ))}
                </div>
                

                <div className="w-150  bg-white fixed right-30 top-30 flex flex-col p-5 text-[20px] items-center space-y-10 rounded-2xl shadow ">
                    <div className="w-full">
                        <div className="flex  justify-between ">
                            <h1>Cantidad de productos:</h1>
                            <h1>x{productsItem.length}</h1>
                        </div>
                        
                        <div className="flex  justify-between">
                            <h1>Pedido realizado por:</h1>
                            <h1>{nameUSer} {lastnameUSer}</h1>
                        </div>

                        <div className="flex  justify-between">
                            <h1>Direccion:</h1>
                            <h1>{directionUser}</h1>
                        </div>

                        <div className="mt-5 bg-neutral-400 w-full h-0.5"></div>

                        <div className="flex mt-5 justify-between">
                            <h1>TOTAL:</h1>
                            <h1 className="font-extrabold">$ {totalCart}</h1>
                        </div>
                    </div>
                    

                    <NavLink to={""} className="bg-blue-300 w-full flex justify-center rounded-[10px] p-5 font-medium transition duration-300 hover:scale-105 hover:bg-blue-400 items-center" onClick={realizeBuy}>
                        {loading && <div className="w-5 h-5 bg-transparent border-b-2 rounded-full mr-5 animate-spin"></div>}
                        REALIZAR COMPRA
                    </NavLink>
                    
                </div>
                    
            </div>
        )
    } else {
        console.log("-------NO HAY PRODUCTOS")
        return(
            <div className="h-screen flex justify-center items-center text-2xl font-extrabold text-neutral-600">
                <h1>CARRITO VACIO :(</h1>
            </div>
        )
    }

        
}


export default CarritoPage