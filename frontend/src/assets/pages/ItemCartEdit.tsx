import { useEffect, useState } from "react"
import { data, Navigate, NavLink, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/loading"




const ItemCartEdit = () =>{

    const [name, setName] = useState<string>("")
    const [categorie, setCategorie] = useState<string>("")
    const [amount, setAmount] = useState<number>(1)
    const [stockP, setStock] = useState<number>(0)
    const [amoutOld, setAmoutOld] = useState<number>(0)
    
    const [price, setPrice] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [idProduct, setIdProduct] = useState<number>(0)

    const [limitAmout, setLimit] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [dataUpgrade, setDataUpgrade] = useState<boolean>(false)

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)
    const idUser = user.id

    const {id} = useParams()
    const idItem = id
    const minorLimitAmout=1

    const navigate = useNavigate()

    useEffect(()=>{
        get_all_carrito()
    },[])

    useEffect(()=>{
        if(dataUpgrade){
            const timer = setTimeout(() => {
                navigate("/inicioPage/carritoPage")
            }, 1000);
        }
    },[dataUpgrade])

    const get_all_carrito=async()=>{
        setLoading(true)
        const response = await fetch("http://localhost:8000/carrito/getItemCarrito/" + idItem + "/" + idUser)
        .then((value)=>value.json())
        .then(async(data)=>{
            setTotal(data.total)
            setAmount(data.amount)
            setAmoutOld(data.amount)
            setIdProduct(data.id_product)
            await fetch("http://localhost:8000/products/"+data.id_product)
                .then((value)=>value.json())
                .then((data)=>{
                    setStock(data[0].stock)
                    setCategorie(data[0].categorie.name)
                    setName(data[0].name)
                    setPrice(data[0].price)
                    setLimit(data[0].stock + data[0].stock)
                })
            })
            setLoading(false)    
    }

    const ButtonFuncionAdd=()=>{
        if(amount<limitAmout){
            setAmount(amount+1)
            setStock((e)=> e -= 1)
            setTotal(prevTotal => parseFloat((prevTotal + price).toFixed(2)));
        } else if(amount>=limitAmout){
            setAmount(limitAmout)
        }
    }

    const ButtonFuncionDelete=()=>{
        if(amount>minorLimitAmout){
            setStock((e)=> e += 1)
            setAmount(amount-1)
            setTotal(prevTotal => parseFloat((prevTotal - price).toFixed(2)));
        } else if(amount<=minorLimitAmout){
            setAmount(minorLimitAmout)
        }
    }

    const ModifyAnItemCart = async () =>{
        if(amoutOld != amount){
            setLoadingData(true)
            const response = await fetch("http://localhost:8000/carrito/modifyAnItemCart/" + id + "/"+ idUser + "/" + stockP,{
                method:"PUT",
                headers:{"Content-Type" : "application/json"},
                body: JSON.stringify({id_product : idProduct, total:total, amount:amount})
                })
            if(response.status==200){
                setDataUpgrade(true)
                setLoadingData(false)
            }
            
        } else {
            console.log("NO SE NOTIFICAN CAMBIOS")
        }
    }
    
    if(loading){
        return(<Loading/>)
    }

    return(
        <div className="basis-full flex items-center justify-center">
            {/* CUADRADO */}
            <div className=" flex flex-col bg-white h-fit w-200 space-y-20 p-10 rounded-b-4xl">

                {/* FOTO */}
                <div className="flex flex-col items-center ">
                    <div className="w-50 h-50 bg-neutral-700 rounded-full flex items-center justify-center text-6xl text-white">
                        {name[0]}
                    </div>
                    <div className="flex flex-col items-center ">
                        <h1 className="text-4xl font-extrabold">{name}</h1>
                        <h1 className="font-black">[ {categorie} ]</h1> 
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

                {/* BOTONES DE COMPRA O CARRITO */}
                <div className="space-y-4">
                    <NavLink to={""} className={`h-20 rounded-3xl font-medium cursor-pointer flex items-center justify-center bg-blue-300 text-white transition duration-300 hover:bg-blue-700 ${dataUpgrade ? "bg-green-600 hover:bg-green-800" : "bg-blue-300 hover:bg-blue-700"}`} onClick={ModifyAnItemCart} >
                        {loadingData&&(
                            <div className="rounded-full w-10 h-10 border-t-4 border-4 border-t-blue-400 border-transparent animate-spin mr-3"></div>
                        )}
                        {loadingData ? "Guardando" : dataUpgrade ? "Cambios guardados" : "Guardar Datos"}
                    </NavLink>
                    <NavLink to={"/inicioPage/carritoPage"} className="h-20 rounded-3xl  2 font-medium cursor-pointer flex items-center justify-center bg-blue-500 text-white transition duration-300 hover:bg-blue-700" >
                        CANCELAR
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default ItemCartEdit