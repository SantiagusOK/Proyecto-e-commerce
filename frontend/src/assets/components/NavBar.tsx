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
                {/* //crear productos */}
                <MyNavLink router={"/"} tittle={"Agregar Productos"}/>
                {/* //crear categorias */}
                <MyNavLink router={"/categorieCreatePage"} tittle={"Agregar Categorias"}/>
                {/* //crearUsuarios */}
                <MyNavLink router={"/userCreatePage"} tittle={"Agregar Usuarios"}/>


            </nav>

        </div>
    )
}