import { useEffect, useState } from "react"
import Loading from "../components/loading"
import { ItemUser } from "../components/itemUsers"

interface UserData{
    id:number,
    fullname:string,
    lastname:string,
    username:string,
    isAdmin:boolean
}

export const AllUsersPage = ()=>{

    const[userList, setUsersList] = useState<UserData[]>([])
    const[loading, setLoading] = useState<boolean>(false)

    const getAllUsers = async()=>{
        setLoading(true)
        await fetch("http://localhost:8000/users/")
        .then((value)=>value.json())
        .then((data)=>setUsersList(data))
        setLoading(false)
    }

    useEffect(()=>{
        getAllUsers()
    },[])


    if(loading){
        return(<Loading/>)
    }


    return(
        
        <div className="h-screen flex flex-col items-center justify-star space-y-0.5 pt-10">

            {userList.map((user)=>(
                <ItemUser user={user} />
            ))}

        </div>
    )
}