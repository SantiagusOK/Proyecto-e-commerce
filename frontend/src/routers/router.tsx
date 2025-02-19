import { createBrowserRouter } from "react-router-dom";


import ProductsCreatePage from "../pages/productsCreatePage";

import CategorieCreatePage from "../pages/categories";


import CarritoPage from "../pages/carritoPage";
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
import AllProductsPage from "../pages/allProductsPage";
import EditProductPage from "../pages/editProduct";
import { ComprarProductoPage } from "../pages/comprarProductoPage";
import ItemProductSelect from "../pages/itemProductSelectPage";


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
                        path:"/inicioPage/allProductsPage",
                        children:[
                            {
                                path:"/inicioPage/allProductsPage",
                                element: <AllProductsPage/>,
                            },
                            {
                                path:"/inicioPage/allProductsPage/editProduct/:id",
                                element: <EditProductPage/>
                            }
                        ]
                    },
                    {
                        path:"/inicioPage/itemBuy/:id",
                        element: <ItemProductSelect/>
                    },
                    {
                        path:"/inicioPage/carritoPage",
                        children:[
                            {
                                path:"/inicioPage/carritoPage",
                                element: <CarritoPage/>,
                            },
                            {
                                path:"/inicioPage/carritoPage/itemCartEdit/:idItem",
                                element: <ItemCartEdit/>
                            },
                        ]

                    },
                    {
                        path:"/inicioPage/ComprarProducto",
                        element: <ComprarProductoPage/>
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
                    },
                    {
                        path:"/inicioPage/editProduct/:id",
                        element: <EditProductPage/>
                    }
                    

                ]
                
            },

                    
        ]
    }
])

export default router