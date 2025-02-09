import { NavLink } from "react-router-dom"

const InicioPage=()=>{

    localStorage.clear()

    return(
        <div className="flex flex-col items-center justify-center space-y-4 h-screen">
            <NavLink to={"/loginPage"} className={"bg-blue-400 text-white p-5 w-100 flex items-center justify-center rounded-2xl"}>INICIAR SESION</NavLink>
            <NavLink to={"/registerPage"} className={"bg-blue-400 text-white p-5 w-100 flex items-center justify-center rounded-2xl"}>REGISTRARSE</NavLink>
        </div>
    )
}

export default InicioPage