import { NavLink } from "react-router-dom"

const CompraRealizadaPage = () =>{
    return(
        <div className="h-screen flex items-center justify-center flex-col">

            <h1>COMPRA REALIZADA CON EXITO</h1>
            <div className="flex items-center justify-center space-x-5 ">

                <NavLink className={"text-blue-700"} to={"/inicio"}>ir al inicio</NavLink>
                <NavLink className={"text-blue-700"} to={"/MisComprasPage"}>ver mis compras</NavLink>

            </div>

        </div>
    )
}

export default CompraRealizadaPage