import { NavLink } from "react-router-dom"
import logo from "../img/logo.png"

const InicioPage=()=>{

    localStorage.clear()

    return(
        <div className="flex flex-col items-center justify-start h-screen space-y-10">
            <div className="bg-blue-500 w-full flex justify-end space-x-3 p-2">
                <NavLink to={"/loginPage"} className={"bg-blue-400 text-white p-5 w-50 h-10  flex items-center justify-center rounded transition hover:bg-blue-700"}>INICIAR SESION</NavLink>
                <NavLink to={"/registerPage"} className={"bg-blue-400 text-white p-5 w-50 h-10 flex items-center justify-center rounded transition hover:bg-blue-700"}>REGISTRARSE</NavLink>
            </div>
            <div className="flex flex-col  items-center justify-center h-full">
                <img className="w-170 h-50 scale-120 transition hover:scale-110" src={logo} alt="" />
                <span className="font-bold">Ahorra dinero. Vive mejor.</span>
            </div>

            <footer className="p-5">
                <span>Copyright©2025, Desing by Agustin Zapata</span>
            </footer>

        </div>
    )
}

export default InicioPage