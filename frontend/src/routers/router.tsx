import { createBrowserRouter } from "react-router-dom";
import CompraRealizadaPage from "../pages/compraRealizadaPage";
import MenuPage from "../pages/menuPage";
import Layout from "../pages/layout";
import { AllUsersPage } from "../pages/allUsersPage";
import { EditUserPage } from "../pages/editUserPage";
import { OrderInfoPage } from "../components/orderInfoPage";
import { InicioLayout } from "../pages/inicioLayout";
import { RegisterUserPage } from "../pages/registerUserPage";
import { RegisterProductPage } from "../pages/registerProductPage";
import { RegisterCategoryPage } from "../pages/registerCategoryPage";
import { LoginUserPage } from "../pages/loginPage";
import { ItemProductSelect } from "../pages/itemProductSelectPage";
import { EditProductPage } from "../pages/editProduct";
import { CarritoPage } from "../pages/carritoPage";
import { PaginaErrorPage } from "../pages/ErrorPage";
import { AllProductsPage } from "../pages/allProductsPage";
import { EditItemProductSelect } from "../pages/editItemProductSelectPage";
import InicioPage from "../pages/InicioPage";
import { AllOrders } from "../pages/allOrders";

const router = createBrowserRouter([
    {path: "/",
        errorElement: <PaginaErrorPage/>,
        element: <InicioLayout></InicioLayout>,
        children:[
            {path:"/",element: <InicioPage></InicioPage>},
            {path:"/register-user",element: <RegisterUserPage/>},
            {path:"/login-user", element: <LoginUserPage/>},      
        ]},

    {path:"/menu",
        errorElement: <PaginaErrorPage/>,
        element: <Layout/>,
        children:[
            {path:"/menu", element: <MenuPage/>},
            {path:"/menu/register-product", element: <RegisterProductPage/>},
            {path:"/menu/register-category", element: <RegisterCategoryPage/>},
            {path:"/menu/products",children:[
                {path:"/menu/products", element: <AllProductsPage/>},
                {path:"/menu/products/edit-product/:id", element: <EditProductPage/>},
                ]},

            {path:"/menu/product/:id", element: <ItemProductSelect/>},
            {path:"/menu/cart", children:[
                {path:"/menu/cart", element: <CarritoPage/>},
                {path:"/menu/cart/edit-item-cart/:id_item", element: <EditItemProductSelect/>}
                ]},

            {path:"/menu/buy-realize", element: <CompraRealizadaPage/>},

            {path:"/menu/all-orders",children:[
                {path:"/menu/all-orders",element:<AllOrders></AllOrders>},
                {path:"/menu/all-orders/order-info/:id_order",element:<OrderInfoPage></OrderInfoPage>},
                ]},
            
            {path:"/menu/users", element: <AllUsersPage/>},
            {path:"/menu/edit-user/:id",element: <EditUserPage/>}]},
])

export default router