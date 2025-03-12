import logo from "../assets/img/logov2.png"
import { useEffect, useState } from "react"

const InicioPage=()=>{

    localStorage.clear()

    const[isLogoVisile, setLogoVisible] = useState<boolean>(false)
    const[isButtonsVisile, setButtonsVisile] = useState<boolean>(false)
    const[isTextVisile, setTextVisile] = useState<boolean>(false)

    useEffect(()=>{
        const timer = setTimeout(() => {
            setLogoVisible(true);
            setButtonsVisile(true)
            setTextVisile(true)
        }, 10);

        return () => clearTimeout(timer);
    },[])

    return(
        <div className="flex flex-col items-center justify-center h-screen">

            
            
            <div className="flex flex-col items-center justify-center w-full h-full space-y-10">
                <img className={`flextransition duration-500 opacity-0 ${isLogoVisile ? "opacity-100 -translate-y-10" : "opacity-0"}`} src={logo} alt="" />
                
                <div className={`flex flex-col justify-center items-center delay-75 transition duration-500 opacity-0 ${isLogoVisile ? "opacity-100 -translate-y-10" : "opacity-0"}`}>
                    <span className="font-bold text-5xl text-white">Ahorra dinero</span>
                    <span className="font-bold text-5xl text-white">Vive mejor.</span>
                </div>              
            </div>

            <footer className="p-5 w-full">
                <span className="text-white">Copyright©2025, Desing by Agustin Zapata</span>
            </footer>

        </div>
    )
}

export default InicioPage