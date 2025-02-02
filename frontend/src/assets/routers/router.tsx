import { createBrowserRouter } from "react-router-dom";

import CategoriePage from "../pages/categories";
import ProductsCreatePage from "../pages/productsCreatePage";
import Layout from "../pages/layout";
import CategorieCreatePage from "../pages/categories";
import UserCreatePage from "../pages/userCreate";
import TableProducts from "../pages/tableProducts";
import Inicio from "../pages/inicio";
import ItemBuy from "../pages/itemEdit";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
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
            }
        ]
    }
])

export default router