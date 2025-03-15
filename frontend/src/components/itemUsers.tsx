import { NavLink } from "react-router-dom";
import { UserData } from "../type/userData";

interface userSchema{
    user: UserData
}

export const UserCard =({ user }:userSchema)=>{
    return(
        <NavLink to={"/menu/edit-user/" + user.id} className="bg-neutral-600 flex w-200 p-5 items-center justify-between transition hover:bg-neutral-500 rounded">
            <div className="flex flex-1">
                <div className="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center text-2xl">
                    {user.fullname[0]}
                </div>

                <div className="p-2  flex-2">
                    <h1 className="text-2xl text-white">{user.fullname} {user.lastname}</h1>
                    <h1 className="text-white">@{user.username}</h1>
                </div>
            </div>
                
            {user.role.roleName==="administrador" &&(
                <div className="h-full flex">
                    <span className="bg-yellow-400 h-fit pl-5 pr-5 rounded">ADMIN</span>
                </div>
            )}
        </NavLink>
    )
}