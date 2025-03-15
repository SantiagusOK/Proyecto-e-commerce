import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { userLoginData } from "../type/userLoginData"
import { useLoginUser } from "../hooks/user_hooks"

export const LoginUserPage = () =>{

    const navigate = useNavigate()
    const {register,handleSubmit, formState:{errors}} = useForm<userLoginData>()
    const[pageVisible, setPageVisible] = useState<boolean>(false)

    const useMutation = useLoginUser()

    const login_user = (userData:userLoginData) => {
        console.log(userData)
        useMutation.mutate(userData)
        
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setPageVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    },[])

    if(useMutation.isSuccess){
        localStorage.setItem("userData", JSON.stringify(useMutation.data))
        navigate("/menu")
    }

    return(
        <div className={`h-screen flex flex-col items-center justify-center space-y-10 duration-500`}>
            
            <p className={`text-white text-4xl font-mono transition duration-500 ${pageVisible ? "opacity-100 -translate-y-10" : "opacity-0"}`}>Iniciar Session</p>

            <form className={`bg-neutral-700 p-5 w-150 flex flex-col space-y-5 rounded transition duration-500 delay-100 ${pageVisible ? "opacity-100 -translate-y-10" : "opacity-0"}`} onSubmit={handleSubmit(login_user)}>

                <div className="space-y-5">
                    <div>
                        <p className="text-white">Nombre de usuario</p>
                        <input {...register("username",{
                            required:{
                                value:true,
                                message:"❌Este campo es obligatorio"
                            }
                        })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" placeholder="Nombre de usuario" type="text" maxLength={12}/>
                        {errors.username&&(<p className="text-red-300 font-mono">{errors.username.message}</p>)}
                    </div>

                    <div>
                        <p className="text-white">Contraseña</p>
                        <input {...register("password",{
                            required:{
                                value:true,
                                message:"❌Este campo es obligatorio"
                            }
                        })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" placeholder="Contraseña" type="password" maxLength={20}/>
                        {errors.password&&(<p className="text-red-300 font-mono">{errors.password.message}</p>)}
                    </div>
                    
                </div>
                
                <div className="w-full flex flex-col justify-center items-center space-y-2">
                    <button className="bg-neutral-400 py-2 w-[50%] cursor-pointer transition hover:bg-neutral-500 flex items-center justify-center space-x-2" type="submit">
                        {
                            useMutation.isPending&&(<div className="rounded-full h-5 w-5 border-2 border-l-transparent border-white animate-spin "></div>)
                        }
                        <p>Iniciar Sesion</p>
                    </button>
                </div>

                <hr />

                <div className="w-full flex items-center justify-center flex-col">
                    <p className="text-white text-xl">¿No tienes una cuenta?</p>
                    <NavLink to={"/register-user"} className={"text-neutral-200 underline"}>Registrate aca</NavLink>
                </div>


            </form>

        </div>
    )
}