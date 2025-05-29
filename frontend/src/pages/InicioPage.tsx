import logo from "../assets/img/logov2.png"
import { useEffect, useState } from "react"

const InicioPage=()=>{

    localStorage.clear()

    const[isLogoVisile, setLogoVisible] = useState<boolean>(false)

    useEffect(()=>{
        const timer = setTimeout(() => {
            setLogoVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    },[])

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            
            <div className="flex flex-col items-center justify-center w-full h-full space-y-10">
                <img className={`flextransition duration-500 opacity-0 ${isLogoVisile ? "opacity-100 -translate-y-10" : "opacity-0"}`} src={logo} alt="" />
                
                <div className={`flex flex-col justify-center items-center delay-75 transition duration-500 opacity-0 ${isLogoVisile ? "opacity-100 -translate-y-10" : "opacity-0"}`}>
                    <span className="font-bold text-5xl text-white">Todo lo que necesitás, en un solo lugar.</span>
                    {/* <span className="font-bold text-5xl text-white">Cargá el changuito de felicidad.</span> */}
                </div>              
            </div>

            <footer className="p-5 w-full fixed bottom-0">
                <span className="text-white">Copyright©2025, Desing by Agustin Zapata</span>
            </footer>

        </div>
    )
}

export default InicioPage