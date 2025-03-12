import { createBrowserRouter } from "react-router-dom";
import CarritoPage from "../pages/carritoPage";
import ItemCartEdit from "../pages/ItemCartEdit";
import PaginaErrorPage from "../pages/ErrorPage";
import CompraRealizadaPage from "../pages/compraRealizadaPage";
import MenuPage from "../pages/menuPage";
import InicioPage from "../pages/InicioPage"
import Layout from "../pages/layout";
import { AllUsersPage } from "../pages/allUsersPage";
import { EditUserPage } from "../pages/editUserPage";
import AllProductsPage from "../pages/allProductsPage";
import EditProductPage from "../pages/editProduct";
import { ComprarProductoPage } from "../pages/comprarProductoPage";
import { ComprasPage } from "../pages/comprasPage";
import { OrderInfoPage } from "../components/orderInfoPage";
import { InicioLayout } from "../pages/inicioLayout";
import { WelcomePage } from "../pages/welcomePage";
import { RegisterUserPage } from "../pages/registerUserPage";
import { RegisterProductPage } from "../pages/registerProductPage";
import { RegisterCategoryPage } from "../pages/registerCategoryPage";
import { LoginUserPage } from "../pages/loginPage";
import { ItemProductSelect } from "../pages/itemProductSelectPage";



const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <PaginaErrorPage/>,
        element: <InicioLayout></InicioLayout>,
        children:[
            {
                path:"/",
                element: <InicioPage/>
                
            },
            {
                path:"/registerUserPage",
                element: <RegisterUserPage/>
            },
            {
                path:"/loginUserPage",
                element: <LoginUserPage/>
                
            },      
        ]
    },
    {
        path:"/welcomePage",
        element: <WelcomePage></WelcomePage>,
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
                path:"/inicioPage/registerProductPage",
                element: <RegisterProductPage/>
            },
            {
                path:"/inicioPage/registerCategoryPage",
                element: <RegisterCategoryPage/>
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
                children:[
                    {
                        path:"/inicioPage/misComprasPage",
                        element:<ComprasPage/>
                    },
                    {
                        path:"/inicioPage/misComprasPage/orderInfo/:id_order",
                        element:<OrderInfoPage></OrderInfoPage>
                    },

                ]
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
                path:"/inicioPage/editProduct/:id_product",
                element: <EditProductPage/>
            }
        ]
        
    },
])

export default router