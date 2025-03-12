import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WelcomePage = () => {
    const local = localStorage.getItem("userData")
    const user = JSON.parse(local!)
    const navigate = useNavigate()

    useEffect(()=>{
            const timer = setTimeout(() => {
                navigate("/inicioPage");
            }, 1000);
    
            return () => clearTimeout(timer);
        },[])

  return (
    <div className="bg-green-700 flex flex-col items-center justify-center h-screen text-white space-y-5">
        <div className="w-60 h-60 bg-amber-300 rounded-full flex items-center justify-center text-3xl">{user.fullname[0]}{user.lastname[0]}</div>
        <div className="flex flex-col items-center justify-center">
            <p className="text-3xl">{user.fullname} {user.lastname}</p>
            <p>@{user.username}</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-3xl">Bienvenido</p>
            <div className="w-20 h-20 border-2 rounded-full border-t-transparent border-r-transparent animate-spin"></div>
        </div>
    </div>
  )
}

