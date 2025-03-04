import { NavLink } from "react-router-dom"
import logo from "../assets/img/logo.png"
import { useSelector, UseSelector } from "react-redux"

interface NavLinkdata{
    router:string,
    tittle:string
}

export default function MyNavBar(){

    // const users = useSelector((state) => state.users.idUser)

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)

    function MyNavLink({ tittle, router} : NavLinkdata){
        return(
            <NavLink to={router} className="text-white font-bold duration-300 hover:text-yellow-400 hover:scale-105  underline-offset-8 ">{tittle}</NavLink>
        )
    }

    return(
        <div className="bg-blue-400  text-white flex justify-between items-center p-2 pr-10 pl-10 h-fit ">
            <img className="w-50 h-15 transition duration-200 hover:scale-110 cursor-pointer" src={logo} alt="" />
            <nav className="space-x-6 flex items-center justify-center">
                {/* pagina inicio */}
                <MyNavLink router={"/inicioPage"} tittle={"Menu"} />
                {user.role_id === 2 &&(
                    <>
                    </>
                    
                )}
                {/* //crear productos */}
                <MyNavLink router={"/inicioPage/productsCreatePage"} tittle={"Agregar Productos"}/>
                {/* //crear categorias */}
                <MyNavLink router={"/inicioPage/categorieCreatePage"} tittle={"Agregar Categorias"}/>
                {/* obtener productos + categoria */}
                <MyNavLink router={"/inicioPage/allProductsPage"} tittle={"Obtener Lista Productos"}/>
                {/* obtener y manipular Usuarios */}
                <MyNavLink router={"/inicioPage/allUserPage"} tittle={"Usuarios"}/>
                
                {/* pagina carrito */}
                <MyNavLink router={"/inicioPage/carritoPage"} tittle={"Carrito"}/>
                {/* pagina mis compras */}
                <MyNavLink router={"/inicioPage/misComprasPage"} tittle={"Mis Compras"}/>
                {/* pagina mis compras */}
                <MyNavLink router={"/"} tittle={"Cerrar sesion"}/>

                <div className="bg-amber-300 h-10 w-10 rounded-full flex justify-center items-center text-1xl text-black">
                    {user.fullname[0]}
                </div>
                
            </nav>
        </div>
    )
}