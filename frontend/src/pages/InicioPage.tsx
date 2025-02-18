import { NavLink } from "react-router-dom"
import logo from "../assets/img/logo.png"

const InicioPage=()=>{

    localStorage.clear()

    return(
        <div className="flex flex-col items-center justify-start h-screen space-y-10">
            <div className="bg-blue-500 w-full flex justify-end space-x-3 p-2">
                <NavLink to={"/loginPage"} className={"bg-blue-400 text-white p-5 w-50 h-10  flex items-center justify-center rounded transition hover:bg-blue-700"}>INICIAR SESION</NavLink>
                <NavLink to={"/registerPage"} className={"bg-blue-400 text-white p-5 w-50 h-10 flex items-center justify-center rounded transition hover:bg-blue-700"}>REGISTRARSE</NavLink>
            </div>
            
            <div className="flex items-center justify-center w-full h-full space-x-20 ">
                <img className="w-170 h-50" src={logo} alt="" />
                <div className="flex flex-col text-5xl">
                    <span className="font-bold">Ahorra dinero</span>
                    <span className="font-bold">Vive mejor.</span>
                </div>
            </div>

            <footer className="p-5">
                <span>Copyright©2025, Desing by Agustin Zapata</span>
            </footer>

        </div>
    )
}

export default InicioPage