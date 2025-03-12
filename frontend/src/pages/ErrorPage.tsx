import error from "../assets/img/error.gif"


export const PaginaErrorPage = () => {
    return(
        <div className=" flex flex-col h-screen items-center justify-center">

            <p className="text-3xl text-white font-black">
                !!OOPS.... 
            </p>
            <p className="text-3xl text-white font-black">Hubo un error al cargar la pagina :)</p>
            <img src={error} alt="" />

        </div>
    )
}
