import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import { NavLink, useParams } from "react-router-dom"

const ItemBuy = () =>{

    const [name, setName] = useState<string>("")
    const [categorie, setCategorie] = useState<string>("")
    const [amount, setAmount] = useState<number>(1)

    const[loading,setLoading] = useState<boolean>(false)
    
    const [price, setPrice] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const {id} = useParams()

    const limitAmout = 15
    const minorLimitAmout=1


    useEffect(()=>{
        
        getAnProduct()
        
    },[])

    const getAnProduct=async()=>{
        setLoading(true)
        await fetch("http://localhost:8000/products/"+id)
        .then((value)=>value.json())
        .then((data)=>{
            setCategorie(data[0].categorie.name)
            setName(data[0].name)
            setPrice(data[0].price)
            setTotal(data[0].price)
        })
        setLoading(false)
    }

    const ButtonFuncionAdd=()=>{
        if(amount<limitAmout){
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


    const AddToCart = () =>{
        fetch("http://localhost:8000/users/setCarrito",{
            method:"PUT",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({id_product : id, total:total, amount:amount})
        })
    }

    
    if(loading){
        return(
            <div className="p-50 flex flex-col space-y-2 items-center justify-center">
                <span>CARGANDO</span>
                <div className="bg-transparent border-b-8 border-neutral-500 animate-spin w-30 h-30 rounded-full"></div>

            </div>
        )
    }

    return(
        <div className="flex items-center justify-center p-10">
            {/* CUADRADO */}
            <div className="flex-col flex bg-white h-fit w-200 space-y-20 p-10 rounded-2xl shadow">

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
                            <h1 className="text-5xl w-30 text-center border-y-2 p-3 ">x{amount}</h1>
                            <input className="text-5xl w-20  rounded-l-2xl border-2 text-center cursor-pointer p-3 border-black active:bg-black active:text-white" type="button" value={"-"} onClick={ButtonFuncionDelete} />
                        </div>
                    </div>
                    <h1 className="font-medium text-5xl text-neutral-500">${total}</h1>
                </div>

                {/* BOTONES DE COMPRA O CARRITO */}
                <div className="space-y-4">
                    <NavLink to={"/inicioPage/carritoPage"} className="h-20 rounded-3xl font-medium cursor-pointer flex items-center justify-center bg-blue-300 text-white transition duration-300 hover:scale-105" onClick={AddToCart} >
                        AGREGAR AL CARRITO
                    </NavLink>
                    <NavLink to={""} className="h-20 rounded-3xl  2 font-medium cursor-pointer flex items-center justify-center bg-blue-500 text-white transition duration-300 hover:scale-105" >
                        COMPRAR PRODUCTO
                    </NavLink>
                </div>

            </div>
            
        </div>
    )
}

export default ItemBuy