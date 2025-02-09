import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

interface NavLinkdata{
    router:string,
    tittle:string
}

export default function MyNavBar(){

    const user = useSelector((state:RootState)=>state.user.username)
    const isAdmin = useSelector((state:RootState)=>state.user.isAdmin)

    function MyNavLink({ tittle, router} : NavLinkdata){
        return(
            <NavLink to={router} className="text-white font-bold hover:text-cyan-200 focus:text-yellow-400  ">

                {tittle}

            </NavLink>
        )
    }

    return(
        <div className="bg-blue-400  text-white flex justify-between items-center p-5">
            <a href="" className="font-extrabold text-2xl transition duration-200 hover:scale-110 hover:text-amber-300" >MegaMercado</a>
            
            <nav className="space-x-6 flex items-center justify-center">
                
                {/* pagina inicio */}
                <MyNavLink router={"/inicioPage"} tittle={"Inicio"} />

                {isAdmin &&(
                    <>
                    {/* //crear productos */}
                    <MyNavLink router={"/inicioPage/productsCreatePage"} tittle={"Agregar Productos"}/>
                    {/* //crear categorias */}
                    <MyNavLink router={"/inicioPage/categorieCreatePage"} tittle={"Agregar Categorias"}/>
                    {/* //crearUsuarios
                    <MyNavLink router={"/inicioPage/userCreatePage"} tittle={"Agregar Usuarios"}/> */}
                    {/* obtener productos + categoria */}
                    <MyNavLink router={"/inicioPage/productsCategoriePage"} tittle={"Obtener Lista Productos"}/>
                    </>
                )}

                {/* pagina carrito */}
                <MyNavLink router={"/inicioPage/carritoPage"} tittle={"Carrito"}/>
                {/* pagina mis compras */}
                <MyNavLink router={"/inicioPage/misComprasPage"} tittle={"Mis Compras"}/>
                {/* pagina mis compras */}
                <MyNavLink router={"/"} tittle={"Cerrar sesion"}/>
                <a className="h-10 w-10 bg-yellow-300 rounded-full flex items-center justify-center text-black font-bold">
                    {user[0]}
                </a>
            </nav>
        </div>
    )
}