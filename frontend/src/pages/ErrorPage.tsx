import { useNavigate } from "react-router-dom"
import error from "../assets/img/error.gif"


const PaginaErrorPage = () => {

    const navigate = useNavigate()

    const backToPage = () =>{
        navigate(-1)
    }

    return(
        <div className=" flex flex-col h-screen items-center justify-center">

            <p className="text-3xl text-white font-black">
                !!OOPS.... 
            </p>
            <p className="text-3xl text-white font-black">Hubo un error al cargar la pagina :)</p>
            <img src={error} alt="" />

            {/* <a href="" onClick={backToPage} className="text-blue-600 underline-offset-1 underline">{"<<"}volver a la pagina anterior</a> */}

        </div>
    )
}

export default PaginaErrorPage