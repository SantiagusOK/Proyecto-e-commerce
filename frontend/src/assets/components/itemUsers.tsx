import { NavLink } from "react-router-dom";

interface UserData {
    id: number;
    fullname: string;
    lastname: string;
    username: string;
    isAdmin: boolean
  }
  
  interface ItemUserProps {
    user: UserData;
  }

  

export const ItemUser =({ user }:ItemUserProps)=>{
    return(
        <NavLink to={"/inicioPage/editUserPage/"+user.id} className="bg-white flex w-200 p-5 items-center justify-between transition hover:bg-neutral-100">
            <div className="flex">
                <div className="bg-neutral-300 rounded-full w-20 h-20 flex items-center justify-center text-2xl">
                    {user.fullname[0]}
                </div>

                <div className="p-2 ">
                    <h1 className="text-2xl">{user.fullname} {user.lastname}</h1>
                    <h1 className="">@{user.username}</h1>
                </div>
            </div>
                

            {user.isAdmin &&(
                <div className=" h-full">
                    <span className="bg-yellow-400  pl-5 pr-5 rounded-2xl">ADMIN</span>
                </div>
            )}




        </NavLink>
    )
}