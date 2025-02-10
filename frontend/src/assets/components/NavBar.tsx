import { NavLink } from "react-router-dom"
import logo from "../img/logo.png"

interface NavLinkdata{
    router:string,
    tittle:string
}

export default function MyNavBar(){

    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)

    function MyNavLink({ tittle, router} : NavLinkdata){
        return(
            <NavLink to={router} className="text-white font-bold hover:text-blue-300 focus:text-yellow-400 underline-offset-8 hover:underline">

                {tittle}

            </NavLink>
        )
    }

    return(
        <div className="bg-blue-400  text-white flex justify-between items-center p-2 pr-10 pl-10 h-fit ">
            <img className="w-50 h-15 transition duration-200 hover:scale-110 cursor-pointer" src={logo} alt="" />
            <nav className="space-x-6 flex items-center justify-center">
                {/* pagina inicio */}
                <MyNavLink router={"/inicioPage"} tittle={"Inicio"} />
                {user.isAdmin &&(
                    <>
                    {/* //crear productos */}
                    <MyNavLink router={"/inicioPage/productsCreatePage"} tittle={"Agregar Productos"}/>
                    {/* //crear categorias */}
                    <MyNavLink router={"/inicioPage/categorieCreatePage"} tittle={"Agregar Categorias"}/>
                    {/* obtener productos + categoria */}
                    <MyNavLink router={"/inicioPage/productsCategoriePage"} tittle={"Obtener Lista Productos"}/>
                    {/* obtener y manipular Usuarios */}
                    <MyNavLink router={"/inicioPage/allUserPage"} tittle={"Todos usuarios"}/>
                    </>
                )}
                
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