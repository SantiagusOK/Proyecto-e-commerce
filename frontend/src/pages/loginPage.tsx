import { useQueries, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { Hooks } from "react-table"
const LoginPage = () =>{

    const[username,setUsername] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[loading, setLoading] = useState<boolean>(false)

    const[isErrorUser, setIsErrorUser] = useState<boolean>(false)
    const[errorUser, setErrorUser] = useState<string>("")

    const[isErrorPassword, setIsErrorPassword] = useState<boolean>(false)
    const[errorPassword, setErrorPassword] = useState<string>("")

    const navigate = useNavigate();

    const {register,handleSubmit, formState:{errors}} = useForm()

    
    const LoginNow = async ()  => {
        setIsErrorPassword(false)
        setIsErrorUser(false)
        setLoading(true)
        try{
            const response = await fetch("http://localhost:8000/user/logUser",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({username:username, password:password})})

                //ERROR DE USUARIO
                if(response.status === 404){
                    console.log("------------------------hola")
                    const errorData = await response.json();
                    setIsErrorUser(true)
                    setErrorUser(errorData.detail)
                    setLoading(false)
                    
                }
                
                //ERROR DE CONTRASEÑA
                if(response.status === 401){
                    const errorData = await response.json();
                    console.log(errorData.detail)
                    setErrorPassword(errorData.detail)
                    setIsErrorPassword(true)
                    setLoading(false)
                    
                }
                
                //USUARIO ENCONTRANDO Y LOGEAR
                if(response.ok){
                const data = await response.json()
                console.log(data)
                localStorage.setItem("userData", JSON.stringify(data))
                navigate("/inicioPage")
                return data
            }
            
        } catch {
            console.log("ERROR")
            setLoading(false)  
        }
        
    }

    return(
        <div className="h-screen flex items-center justify-center">

            <div className="bg-white flex flex-col items-center justify-center p-5 space-y-10 rounded-2xl shadow w-100">
                <h1>INICIAR SESION</h1>
                <form onSubmit={handleSubmit(LoginNow)} className="flex flex-col items-center justify-center space-y-10">
                    <div className="flex flex-col space-y-4">

                        {/* INPUT USERNAME */}
                        <div className="flex flex-col items-center">
                            {isErrorUser && <span className="text-red-500 font-medium">{errorUser}</span>}
                            {errors.username && <span className="text-red-500 font-medium">{errors.username.message}</span>}
                            <input {...register("username",{
                                required: "Intente escribir su nombre de usuario"
                            })} className="rounded-2xl border p-3 w-70 border-neutral-400 outline-none" type="text" maxLength={10} placeholder="Nombre de usuario" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        
                        {/* INPUT PASSWORD */}
                        <div className="flex flex-col items-center">
                            {isErrorPassword && <span className="text-red-500 font-medium">{errorPassword}</span>}
                            {errors.password && <span className="text-red-500 font-medium">{errors.password.message}</span>}
                            <input {...register("password",{
                                required: "Intente escribir su contraseña"
                            })} className="rounded-2xl border p-3 w-70 border-neutral-400 outline-none" type="password" maxLength={10} placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
                        </div>  

                    </div> 
                    <button className="bg-blue-300 text-2xl p-2 pr-10 pl-10  rounded-2xl text-white cursor-pointer transition   hover:bg-blue-500 flex justify-center items-center space-x-10" type="submit" onClick={()=>{
                        setIsErrorPassword(false), setIsErrorUser(false)
                    }}>
                        {loading && <div className="w-5 h-5 bg-transparent border-b-2 rounded-full mr-5 animate-spin"></div>}
                        INICIAR SESION
                    </button>                    
                </form>
                
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