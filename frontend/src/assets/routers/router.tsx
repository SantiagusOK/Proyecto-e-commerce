import { createBrowserRouter } from "react-router-dom";

import CategoriePage from "../pages/categories";
import ProductsCreatePage from "../pages/productsCreatePage";
import Layout from "../pages/layout";
import CategorieCreatePage from "../pages/categories";
import UserCreatePage from "../pages/userCreate";
import TableProducts from "../pages/tableProducts";
import Inicio from "../pages/inicio";
import ItemBuy from "../pages/itemEdit";
import CarritoPage from "../pages/carrito";
import ItemCartEdit from "../pages/ItemCartEdit";
import PaginaErrorPage from "../pages/paginaErrorPage";
import CompraRealizadaPage from "../pages/compraRealizadaPage";
import MisComprasPage from "../pages/comprasPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <PaginaErrorPage/>,
        children:[
            {
                //path:"/CrearProducto"
                path:"/",
                element: <ProductsCreatePage/>
            },
            {
                path:"/categorieCreatePage",
                element: <CategorieCreatePage/>
            },
            {
                path:"/userCreatePage",
                element: <UserCreatePage/>
            },
            {
                path:"/productsCategoriePage",
                element: <TableProducts/>
            },
            {
                path:"/inicio",
                element: <Inicio/>
            },
            {
                path:"/itemBuy/:id",
                element: <ItemBuy/>
            },
            {
                path:"/carritoPage",
                element: <CarritoPage/>

            },
            {
                path:"/itemCartEdit/:id",
                element: <ItemCartEdit/>
            },
            {
                path:"/compraRealizadaPage",
                element: <CompraRealizadaPage/>
            },
            {
                path:"/misComprasPage",
                element: <MisComprasPage/>
            }
        ]
    }
])

export default router