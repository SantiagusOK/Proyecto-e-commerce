import { useState } from "react"
import { useDispatch } from "react-redux"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { loginUser } from "../../redux/userSlice"

const LoginPage = () =>{

    const[username,setUsername] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const LoginNow = async ()  => {
        setLoading(true)
        const responde = await fetch("http://localhost:8000/users/verifyLogin",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({username:username, password:password})})
        
        if(responde){
            const data = await responde.json()
            dispatch(loginUser(data))
            console.log(data)
            navigate("/inicioPage")
        } else{
            console.log("NO SE PUDO CAMBIAR DE PAGINA")
        }
        setLoading(false)
    }

    return(
        <div className="h-screen flex items-center justify-center">

            <div className="bg-white flex flex-col items-center justify-center p-5 space-y-10 rounded-2xl shadow-2xl w-100">
                <h1>INICIAR SESION</h1>

                <div className="flex flex-col space-y-4">
                    <input className="rounded-2xl border p-3 w-70 border-neutral-400 outline-none" type="text" maxLength={10} placeholder="Nombre de usuario" value={username} onChange={(e)=>setUsername(e.target.value)}/>

                    <input className="rounded-2xl border p-3 w-70 border-neutral-400 outline-none" type="password" maxLength={10} placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
                </div>

                
                <NavLink className="bg-blue-300 text-2xl p-2 pr-10 pl-10  rounded-2xl text-white cursor-pointer transition duration-300 hover:scale-105 hover:bg-blue-500 flex justify-center items-center space-x-10" type="button" to={""} onClick={LoginNow}>
                    {loading && <div className="w-5 h-5 bg-transparent border-b-2 rounded-full mr-5 animate-spin"></div>}
                    INICIAR SESION

                </NavLink>

                <div className="flex flex-col items-center justify-center">
                    <h1 className="">¿No tienes una cuenta todavia?</h1>
                    <NavLink to={"/registerPage"} className={"text-blue-500 underline"}>
                    Registrarte ahora
                    </NavLink>
                </div>
                
                

            </div>

        </div>
    )
}

export default LoginPage