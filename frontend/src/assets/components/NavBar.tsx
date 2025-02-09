import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

interface NavLinkdata{
    router:string,
    tittle:string
}

export default function MyNavBar(){

    const user = useSelector((state)=>state.user.username)
    const isAdmin = useSelector((state)=>state.user.isAdmin)

    function MyNavLink({ tittle, router} : NavLinkdata){
        return(
            <NavLink to={router} className="text-white hover:text-cyan-500 focus:text-yellow-400  ">

                {tittle}

            </NavLink>
        )
    }

    return(
        <div className="bg-neutral-800  text-white flex justify-between p-5">
            <h1>BUY-PRODUCT.COM</h1>
            <nav className="space-x-6 flex items-center justify-center">
                {isAdmin &&(
                    <>
                    {/* //crear productos */}
                    <MyNavLink router={"/inicioPage/productsCreatePage"} tittle={"Agregar Productos"}/>
                    {/* //crear categorias */}
                    <MyNavLink router={"/inicioPage/categorieCreatePage"} tittle={"Agregar Categorias"}/>
                    {/* //crearUsuarios */}
                    <MyNavLink router={"/inicioPage/userCreatePage"} tittle={"Agregar Usuarios"}/>
                    {/* obtener productos + categoria */}
                    <MyNavLink router={"/inicioPage/productsCategoriePage"} tittle={"Obtener Lista Productos"}/>
                    </>
                )}
                {/* pagina inicio */}
                <MyNavLink router={"/inicioPage"} tittle={"Inicio"} />
                {/* pagina carrito */}
                <MyNavLink router={"/inicioPage/carritoPage"} tittle={"Carrito"}/>
                {/* pagina mis compras */}
                <MyNavLink router={"/inicioPage/misComprasPage"} tittle={"Mis Compras"}/>
                {/* pagina mis compras */}
                <MyNavLink router={"/"} tittle={"Cerrar sesion"}/>
                <div className="h-10 w-10 bg-neutral-300 rounded-full flex items-center justify-center text-3xl ">{user[0]}</div>
            </nav>
        </div>
    )
}