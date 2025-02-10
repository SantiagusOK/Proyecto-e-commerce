import { createBrowserRouter } from "react-router-dom";


import ProductsCreatePage from "../pages/productsCreatePage";

import CategorieCreatePage from "../pages/categories";

import TableProducts from "../pages/tableProducts";

import ItemBuy from "../pages/itemEdit";
import CarritoPage from "../pages/carrito";
import ItemCartEdit from "../pages/ItemCartEdit";
import PaginaErrorPage from "../pages/paginaErrorPage";
import CompraRealizadaPage from "../pages/compraRealizadaPage";
import MisComprasPage from "../pages/comprasPage";
import MenuPage from "../pages/menuPage";
import InicioPage from "../pages/InicioPage";
import UserCreatePage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import Layout from "../pages/layout";
import { AllUsersPage } from "../pages/allUsersPage";
import { EditUserPage } from "../pages/editUserPage";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <PaginaErrorPage/>,
        children:[
            {
                path:"/",
                element: <InicioPage/>
                
            },
            {
                path:"/registerPage",
                element: <UserCreatePage/>
            },
            {
                path:"/loginPage",
                element: <LoginPage/>
                
            },
            {
                path:"/inicioPage",
                errorElement: <PaginaErrorPage/>,
                element: <Layout/>,
                children:[
                    {
                        path:"/inicioPage",
                        element: <MenuPage/>
                        
                    },
                    {
                        path:"/inicioPage/productsCreatePage",
                        element: <ProductsCreatePage/>
                    },
                    {
                        path:"/inicioPage/categorieCreatePage",
                        element: <CategorieCreatePage/>
                    },

                    {
                        path:"/inicioPage/productsCategoriePage",
                        element: <TableProducts/>
                    },
                    {
                        path:"/inicioPage/itemBuy/:id",
                        element: <ItemBuy/>
                    },
                    {
                        path:"/inicioPage/carritoPage",
                        element: <CarritoPage/>

                    },
                    {
                        path:"/inicioPage/itemCartEdit/:id",
                        element: <ItemCartEdit/>
                    },
                    {
                        path:"/inicioPage/compraRealizadaPage",
                        element: <CompraRealizadaPage/>
                    },
                    {
                        path:"/inicioPage/misComprasPage",
                        element: <MisComprasPage/>
                    },
                    {
                        path:"/inicioPage/allUserPage",
                        element: <AllUsersPage/>
                    },
                    {
                        path:"/inicioPage/editUserPage/:id",
                        element: <EditUserPage/>
                    }

                ]
                
            },

                    
        ]
    }
])

export default router