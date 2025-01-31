import { createBrowserRouter } from "react-router-dom";

import CategoriePage from "../pages/categories";
import ProductsCreatePage from "../pages/productsCreatePage";
import Layout from "../pages/layout";
import CategorieCreatePage from "../pages/categories";
import UserCreatePage from "../pages/userCreate";
import TableProducts from "../pages/tableProducts";


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
            }
        ]
    }
])

export default router