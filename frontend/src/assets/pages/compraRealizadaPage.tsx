import { NavLink } from "react-router-dom"

const CompraRealizadaPage = () =>{
    return(
        <div className="h-screen flex items-center justify-center flex-col space-y-5">

            <h1 className="text-3xl">COMPRA REALIZADA CON EXITO</h1>
            <div className="flex items-center justify-center space-x-5 ">

                <NavLink className={"bg-blue-400 pr-5 pl-5 rounded-2xl text-white"} to={"/inicioPage"}>ir al inicio</NavLink>
                <NavLink className={"bg-blue-400 pr-5 pl-5 rounded-2xl text-white"} to={"/inicioPage/MisComprasPage"}>ver mis compras</NavLink>

            </div>

        </div>
    )
}

export default CompraRealizadaPage