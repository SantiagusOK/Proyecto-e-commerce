import { useNavigate } from "react-router-dom"
import error from "../img/error.gif"


const PaginaErrorPage = () => {

    const navigate = useNavigate()

    const backToPage = () =>{
        navigate(-1)
    }

    return(
        <div className=" flex flex-col h-screen items-center justify-center">

            <h1 className="text-2xl">
                !!OOPS.... Hubo un error al cargar la pagina :)
            </h1>
            <img src={error} alt="" />

            {/* <a href="" onClick={backToPage} className="text-blue-600 underline-offset-1 underline">{"<<"}volver a la pagina anterior</a> */}

        </div>
    )
}

export default PaginaErrorPage