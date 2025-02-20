import { useEffect, useState } from "react"
import ItemProductsCart from "../components/ItemProductsCart"
import { NavLink, useNavigate } from "react-router-dom"
import Loading from "../components/loading"

interface categoryData{
    name:string
}

interface productData{
    name:string,
    price:number,
    stock:number,
    idProduct:number,
    
}

interface ProductsCartData{
    total:number
    cantidad:number,
    priceProduct:number,
    id_item_carrito:number,
    product:productData,
    category:categoryData
    
}

const CarritoPage = () =>{

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)

    const[itemCarrito, setItemCarrito] = useState<ProductsCartData[]>([])
    const[totalCart, setTotalCart] = useState<number>(0)
    const[loading, setLoading] = useState(false)
    const[processingBuy, setProcessingBuy] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(()=>{
        get_all_cart()
    },[])

    const get_all_cart = async () => {
        setLoading(true)
        const response = await fetch("http://localhost:8000/carrito/getCarrito/"+user.idUser)
        if(response.status == 200){
            const items = await response.json()
            setItemCarrito(items)
            const total = items.reduce((acc: any, item: { total: any }) => acc + item.total, 0);
            setTotalCart(total.toFixed(2));
        }
        setLoading(false)
        
    }

    const realizeBuy=async()=>{
        setProcessingBuy(true)
        setLoading(true)

        const fecha = new Date()
        const fechaStr = fecha.toLocaleString()
        const response = await fetch("http://localhost:8000/carrito/realizeABuy/"+user.idUser,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id_user:user.idUser, 
                fechaDeCompra:fechaStr,
                totalCompra:Number(totalCart),})
        })

        if(response.status == 202){
            navigate("/inicioPage/compraRealizadaPage")
        } else if (response.status == 404){
            console.log("ERRRRRRRRRRRRRRRO")
            }

        setProcessingBuy(false)
        setLoading(false)
    }

    if(loading){
        return(<Loading/>)
    } 

    if(itemCarrito.length>0){
        return(
            <div className="h-full flex items-start justify-between  p-10">
                
                <div className={`h-200 space-y-0.5 rounded-2xl ${itemCarrito.length>3 ? 'overflow-y-scroll' : 'h-auto'}`}>
                    {itemCarrito.map((products)=>(
                            <ItemProductsCart category={products.category} product={products} />
                        ))}
                </div>
                

                <div className="w-130  bg-white flex flex-col p-5 text-[20px] items-center space-y-10 rounded-2xl shadow ">
                    <div className="w-full">
                        <div className="flex  justify-between ">
                            <h1>Cantidad de productos:</h1>
                            <h1>x{itemCarrito.length}</h1>
                        </div>
                        
                        <div className="flex  justify-between">
                            <h1>Pedido realizado por:</h1>
                            <h1>{user.fullname} {user.lastname}</h1>
                        </div>

                        <div className="flex  justify-between">
                            <h1>Direccion:</h1>
                            <h1>{user.direccion}</h1>
                        </div>

                        <div className="mt-5 bg-neutral-400 w-full h-0.5"></div>

                        <div className="flex mt-5 justify-between">
                            <h1>TOTAL:</h1>
                            <h1 className="font-extrabold">$ {totalCart}</h1>
                        </div>
                    </div>

                    <NavLink to={""} className="bg-blue-300 w-full flex justify-center rounded-[10px] p-5 font-medium transition duration-300 hover:bg-blue-700 items-center" onClick={realizeBuy}>
                        {processingBuy && <div className="w-10 h-10 bg-transparent border-transparent border-4 border-t-blue-400 rounded-full mr-5 animate-spin"></div>}
                        <span className="text-white">Realizar Compra</span>
                    </NavLink>
                    
                </div>
                    
            </div>
        )
    } else {
        return(
            <div className="h-screen flex justify-center items-center text-2xl font-extrabold text-neutral-600">
                <h1>CARRITO VACIO :(</h1>
            </div>
        )
    }

        
}


export default CarritoPage