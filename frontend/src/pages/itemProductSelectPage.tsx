import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/loading"
import { useAnProducts } from "../hooks/products_hooks"

const ItemProductSelect = () =>{
    const{id} = useParams()

    const{data:product, isError, isLoading} = useAnProducts(Number(id))

    const [name, setName] = useState<string>("")
    const [categorie, setCategorie] = useState<string>("")
    const [amount, setAmount] = useState<number>(1)
    
    const [price, setPrice] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)

    const[loadingData,setLoadingData] = useState<boolean>(false)

    const limitAmout = stock
    const minorLimitAmout=1

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)
    const id_user = Number(user.id)

    const navigate = useNavigate()

    useEffect(()=>{
        if(product){
            setCategorie(product.category.name)
            setName(product.name)
            setPrice(product.price)
            setTotal(product.price)
            setStock(product.stockCurrent)
        }
    },[product])

    const ButtonFuncionAdd=()=>{
        if(amount<stock){
            setAmount(amount+1)
            setTotal(prevTotal => parseFloat((prevTotal + price).toFixed(2)));
        } else if(amount>=limitAmout){
            setAmount(limitAmout)
        }
    }

    const ButtonFuncionDelete=()=>{
        if(amount>minorLimitAmout){
            setAmount(amount-1)
            setTotal(prevTotal => parseFloat((prevTotal - price).toFixed(2)));
        } else if(amount<=minorLimitAmout){
            setAmount(minorLimitAmout)
        }
    }

    const AddToCart = async () =>{
        try{

            setLoadingData(true)
    
            console.log(id_user)
            const id_product = product?.id
    
            console.log("Id_product: " + id_product)
    
            const createCart = await fetch("http://localhost:8000/cart/createCart/" + id_user)
    
            if(!createCart.ok){
                setLoadingData(false)
            }
    
            const saveItem = await fetch("http://localhost:8000/cart/saveItemInCart/" + id_user, {
                method: "PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    id_product:id_product,
                    quantity:amount,
                    unityPrice:total
                })
            })
    
            if(saveItem.ok){
                navigate("/inicioPage/carritoPage")
            }
    
            
        } catch(error) {
            console.log(error)
            setLoadingData(false)
        }
    }

    if(isLoading){
        return(<Loading/>)
    }

    return(
        <div className="basis-full flex items-center justify-center">
            {/* CUADRADO */}
            <div className=" flex flex-col bg-white h-fit w-200 space-y-20 p-10 rounded-b-3xl ">

                {/* FOTO */}
                <div className="flex items-center  justify-evenly">
                    <div className="w-50 h-50 bg-neutral-700 rounded-full flex items-center justify-center text-6xl text-white">
                        {name[0]}
                    </div>
                    <div className="flex flex-col items-center ">
                        <h1 className="text-4xl font-medium">{name}</h1>
                        <h1 className="font-black"> {categorie} </h1> 
                    </div>   
                </div>
                
                {/* BOTONES DE CANTIDAD */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="font-mono">CANTIDAD</h1>
                        <div className="flex justify-center items-center flex-row-reverse">
                            <input className="text-5xl w-20  rounded-r-2xl border-2 text-center cursor-pointer p-3 border-black active:bg-black active:text-white " type="button" value={"+"} onClick={ButtonFuncionAdd} />
                            <h1 className="text-5xl w-30 text-center border-y-2 font-bold p-3 ">x{amount}</h1>
                            <input className="text-5xl w-20  rounded-l-2xl border-2 text-center cursor-pointer p-3 border-black active:bg-black active:text-white" type="button" value={"-"} onClick={ButtonFuncionDelete} />
                        </div>
                    </div>
                    <h1 className="font-bold text-5xl text-green-700">${total}</h1>
                </div>

                {/* BOTON DE CARRITO */}
                <div className="space-y-4">
                    <NavLink to={""} className="h-20 rounded-2xl font-medium cursor-pointer flex items-center justify-center bg-blue-300 text-white transition hover:bg-blue-600" onClick={AddToCart} >
                        {loadingData &&(<div className="h-10 w-10 rounded-full border-4 border-t-blue-400 border-transparent animate-spin mr-3"></div>)}
                        AGREGAR AL CARRITO
                    </NavLink>
                </div>

            </div>
            
        </div>
    )
}


export default ItemProductSelect