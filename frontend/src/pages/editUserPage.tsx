import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../components/loading";
import { useAnUser } from "../hooks/user_hooks";
import { useRoles } from "../hooks/role_hooks";

export const EditUserPage = () =>{
    const{id}=useParams()

    const{data:user, isLoading:loadingUser} = useAnUser(Number(id))
    const{data:roles, isLoading:loadingRoles} = useRoles()

    const[loadingData,setLoadingData] = useState<boolean>(false)
    const[id_role, setIdRole] = useState<number>(1)
    const[shotMessage, setShowMessage] = useState<boolean>(false)
    const[oldAdminState, setOldAdminState] = useState<number>(0)

    useEffect(()=>{
        if(user){
            setIdRole(user?.role.id)
            setOldAdminState(user?.role.id)
        }
    },[user])

    if(loadingUser || loadingRoles){
        return(<Loading/>)
    }

    // const save_data = async () => {
    //     setShowMessage(false)
    //     if(oldAdminState != id_role){
    //         setLoadingData(true)
    //         const response = await fetch("http://localhost:8000/users/setAdmin/"+id,{
    //             method: "PUT",
    //             headers: {"Content-Type":"application/json"},
    //             body: JSON.stringify({isAdmin:userIsAdmin})
    //         })

    //         if(response){
    //             setOldAdminState(userIsAdmin)
    //             setShowMessage(true)
    //             setLoadingData(false)
    //         }  
    //     }
        
    // }

    return(
        <div className="flex justify-center ">

            <div className="bg-white flex flex-col items-star p-5 w-120 space-y-5">

                <div className="flex items-center justify-between space-x-3">

                    <div className="bg-neutral-200 w-30 h-30 flex items-center justify-center rounded-full text-2xl">
                        {user?.fullname[0]}
                    </div>

                    <div className="flex flex-col items-star">
                        <h1>{user?.fullname} {user?.lastname}</h1>
                        <span>@{user?.username}</span>
                    </div>

                </div>

                <hr />

                <div>
                    <span>Direccion</span>
                    <div className="flex justify-between">
                        <p>Calle</p>
                        <p>{user?.address.street}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Ciudad</p>
                        <p>{user?.address.city}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Estado</p>
                        <p>{user?.address.state}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Pais</p>
                        <p>{user?.address.country}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Codigo Postal</p>
                        <p>{user?.address.postal_code}</p>
                    </div>

                </div>

                <hr />
                <div>

                    <div className="flex justify-between">
                        <span>Fecha de nacimiento</span>
                        <h1>{user?.birthdate}</h1>
                    </div>

                    <div className="flex justify-between">
                        <span>Corre Electronico</span>
                        <h1>{user?.email}</h1>
                    </div>

                    <div className="flex justify-between">
                        <span>Rol</span>
                        <select className="border-2 border-neutral-400" onChange={(e) => setIdRole(Number(e.target.value))} value={id_role}>
                            {roles?.map((role) => (
                                <option value={role.id}>{role.roleName}</option>
                            ))}
                            
                        </select>
                    </div>
                </div>


                <button className="p-2 pl-5 pr-5 bg-blue-400 rounded-[5px] text-white cursor-pointer transition hover:bg-blue-500 flex items-center justify-center space-x-2" type="button" value={"Guardar cambios"}>
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