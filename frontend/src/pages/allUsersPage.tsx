import Loading from "../components/loading"
import { UserCard } from "../components/itemUsers"
import { useUsersListBasic } from "../hooks/user_hooks"

export const AllUsersPage = ()=>{
    const{data:user, isLoading} = useUsersListBasic()

    if(isLoading){
        return(<Loading/>)
    }

    return(
        <div className="h-screen flex flex-col items-center justify-star space-y-0.5 pt-10">

            {user!.map((user)=>(
                <UserCard user={user} />
            ))}
            
        </div>
    )
}