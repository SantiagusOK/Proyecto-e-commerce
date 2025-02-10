import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../components/loading";

interface UserData {
    id: number;
    fullname: string;
    lastname: string;
    username: string;
    email: string;
    isAdmin: boolean;
    direccion: string;
    birthdate: string;
  }

export const EditUserPage = () =>{
    const[user,setUser] = useState<UserData>()
    const[loading,setLoading] = useState<boolean>(false)
    const[loadingData,setLoadingData] = useState<boolean>(false)
    const[userIsAdmin, setAdmin] = useState<boolean>(false)
    const[shotMessage, setShowMessage] = useState<boolean>(false)
    const{id}=useParams()

    const getAUser=async()=>{
        setLoading(true)
        await fetch("http://localhost:8000/users/"+id).then((value)=>value.json()).then((data)=>{
            setUser(data)
            setAdmin(Boolean(data.isAdmin))
            
        })
        console.log("El usuario es admin?: "+userIsAdmin)
        setLoading(false)
        
    }

    useEffect(()=>{
        getAUser()
    },[])

    if(loading){
        return(
            <Loading/>
        )
    }

    
    const saveData =async()=>{
        setLoadingData(true)
        setShowMessage(false)
        const response = await fetch("http://localhost:8000/users/setAdmin/"+id,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({isAdmin:userIsAdmin})
        })

        if(response){
            setLoadingData(false)
            setShowMessage(true)
        }
    }

    return(
        <div className="h-screen flex items-center justify-center">

            <div className="bg-white flex flex-col items-star p-5 w-100 space-y-5">

                <div className="flex items-center justify-evenly space-x-3">

                    <div className="bg-neutral-200 w-30 h-30 flex items-center justify-center rounded-full text-2xl">
                        {user?.fullname[0]}
                    </div>

                    <div className="flex flex-col items-center">
                        <h1>{user?.fullname} {user?.lastname}</h1>
                        <span>@{user?.username}</span>
                    </div>

                </div>

                <div className="h-0.5 w-full bg-neutral-300"></div>

                <div className="flex justify-between">
                    <span>Direccion</span>
                    <h1>{user?.direccion}</h1>
                </div>

                <div className="flex justify-between">
                    <span>Año de nacimiento</span>
                    <h1>{user?.birthdate}</h1>
                </div>

                <div className="flex justify-between">
                    <span>Corre Electronico</span>
                    <h1>{user?.email}</h1>
                </div>

                <div className="flex justify-between">
                    <span>Es Admin?</span>
                    <select name="" id="" value={String(userIsAdmin)} onChange={(e)=>setAdmin(e.target.value=="true" ? true : false)}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <button className="p-2 pl-5 pr-5 bg-blue-400 rounded-[5px] text-white cursor-pointer transition hover:bg-blue-500 flex items-center justify-center space-x-2" type="button" value={"Guardar cambios"} onClick={saveData}>
                    {loadingData &&(
                        <div className=" h-5 w-5 border-b-4 border-blue-700 rounded-full animate-spin"></div>
                    )}
                    <span>
                        Guardar Cambios
                    </span>
                </button>
                <div className="flex justify-center">
                  {shotMessage &&(
                    <span className="text-green-500 font-bold">Datos guardados</span>
                    )}  
                </div>
                

            </div>

        </div>
    )

}