import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../components/loading";
import { useRoleUser,useUser } from "../hooks/user_hooks";
import { useRoles } from "../hooks/role_hooks";

export const EditUserPage = () =>{
    const{id}=useParams()

    const{data:user, isLoading:loadingUser} = useUser(Number(id))
    const{data:roles, isLoading:loadingRoles} = useRoles()

    const roleUserMutation = useRoleUser()
    const[id_role, setIdRole] = useState<number>(1)
    const[notChange, setNotChange] = useState<boolean>(false)

    useEffect(() => {
        if(user||roles){
            setIdRole(user!.role.id)
        }
    },[user])

    if(loadingUser || loadingRoles){
        return(<Loading/>)
    }

    const saveChanged = () => {
        console.log(id_role + " = " + user!.role.id)
        if(id_role == user!.role.id){
            setNotChange(true)
        } else {
            setNotChange(false)
            roleUserMutation.mutate({id_user:Number(id), id_role:id_role})
        }
    }

    if(roleUserMutation.isSuccess){
        window.location.reload();
    }

    return(
        <div className="flex justify-center p-10">

            <div className="bg-neutral-600 flex flex-col items-star p-5 w-120 space-y-5 rounded">

                <div className="flex items-center justify-between space-x-3">

                    <div className="bg-neutral-200 w-30 h-30 flex items-center justify-center rounded-full text-2xl">
                        {user?.fullname[0]}
                    </div>

                    <div className="flex flex-col items-star text-white">
                        <h1>{user?.fullname} {user?.lastname}</h1>
                        <span>@{user?.username}</span>
                    </div>

                </div>

                <hr />

                <div className="text-white">
                    <span className="text-white">Direccion</span>
                    <div className="flex justify-between ">
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
                <div className="text-white">

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
                        <select className="border-2 border-neutral-400 text-black bg-white" onChange={(e) => setIdRole(Number(e.target.value))} value={id_role}>
                            {roles?.map((role) => (
                                <option value={role.id}>{role.roleName.toUpperCase()}</option>
                            ))}
                            
                        </select>
                    </div>
                </div>


                <button className="p-2 pl-5 pr-5 bg-neutral-500 rounded-[5px] text-white cursor-pointer transition hover:bg-neutral-700 flex items-center justify-center space-x-2" type="button" value={"Guardar cambios"} onClick={saveChanged}>
                    {roleUserMutation.isPending &&(
                        <div className=" h-5 w-5 border-2 border-t-transparent border-l-transparent border-white rounded-full animate-spin"></div>
                    )}
                    <span>
                        Guardar Cambios
                    </span>
                </button>
                {/* {
                    roleUserMutation.isSuccess&&(<span className="text-green-500 font-bold w-full text-center">Datos guardados</span>)
                } */}
                {
                    roleUserMutation.isError&&(<span className="text-red-300 font-bold w-full text-center">Error al intentar guardar los datos</span>)
                }
                {
                    notChange&&(<span className="text-red-300 font-bold w-full text-center">Hay cambios para guardar</span>)
                }
                

            </div>

        </div>
    )

}

