import { NavLink } from "react-router-dom"
import  logov3  from "../assets/img/logov3.png"

interface NavLinkdata{
    router:string,
    tittle:string
}

export default function MyNavBar(){
    const storage = localStorage.getItem("userData")
    const user = JSON.parse(storage!)

    function MyNavLink({ tittle, router} : NavLinkdata){
        return(
            <NavLink to={router} className="text-white font-bold duration-300 hover:text-yellow-400 hover:scale-105  underline-offset-8 ">{tittle}</NavLink>
        )
    }

    return(
        <div className="bg-neutral-700  text-white flex justify-between items-center p-2 pr-10 pl-10 h-fit ">
            <img className="w-50" src={logov3} alt="" />
            <nav className="space-x-6 flex items-center justify-center">
                {/* pagina inicio */}
                <MyNavLink router={"/menu"} tittle={"Menu"} />
                {user.role.roleName === "administrador" &&(
                    <>
                        {/* //crear productos */}
                        <MyNavLink router={"/menu/register-product"} tittle={"Registrar Productos"}/>
                        {/* //crear categorias */}
                        <MyNavLink router={"/menu/register-category"} tittle={"Registrar Categorias"}/>
                        {/* obtener productos + categoria */}
                        <MyNavLink router={"/menu/products"} tittle={"Obtener Lista Productos"}/>
                        {/* obtener y manipular Usuarios */}
                        <MyNavLink router={"/menu/users"} tittle={"Usuarios"}/>
                        

                    </>
                )}

                {/* pagina mis compras */}
                <MyNavLink router={"/menu/all-orders"} tittle={"Ordenes"}/>

                {/* pagina carrito */}
                <MyNavLink router={"/menu/cart"} tittle={"Carrito"}/>
                
                {/* pagina mis compras */}
                <MyNavLink router={"/"} tittle={"Cerrar sesion"}/>

                <div className="bg-amber-300 h-10 w-10 rounded-full flex justify-center items-center text-1xl text-black">
                    {user.fullname[0]}
                </div>
                
            </nav>
        </div>
    )
}