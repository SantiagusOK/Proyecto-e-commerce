import { NavLink } from "react-router-dom"

interface NavLinkdata{
    router:string,
    tittle:string
}

export default function MyNavBar(){

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
            <nav className="space-x-6">
                {/* pagina inicio */}
                <MyNavLink router={"/inicio"} tittle={"Inicio"} />
                {/* //crear productos */}
                <MyNavLink router={"/"} tittle={"Agregar Productos"}/>
                {/* //crear categorias */}
                <MyNavLink router={"/categorieCreatePage"} tittle={"Agregar Categorias"}/>
                {/* //crearUsuarios */}
                <MyNavLink router={"/userCreatePage"} tittle={"Agregar Usuarios"}/>
                {/* obtener productos + categoria */}
                <MyNavLink router={"/productsCategoriePage"} tittle={"Obtener Lista Productos"}/>
                {/* pagina carrito */}
                <MyNavLink router={"/carritoPage"} tittle={"Carrito"}/>
                {/* pagina mis compras */}
                <MyNavLink router={"/misComprasPage"} tittle={"Mis Compras"}/>
            </nav>
        </div>
    )
}