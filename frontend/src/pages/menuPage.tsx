import { useEffect, useState } from "react"
import ItemProducts from "../components/ItemProduct"
import Loading from "../components/loading"
import { CategoryData } from "../type/categoryData"
import { ProductData } from "../type/productData"
import { useQuery } from "@tanstack/react-query"
import { useProducts } from "../hooks/products_hooks"
import { useCategory } from "../hooks/category_hooks"
import { useFetcher } from "react-router-dom"




const MenuPage = () => {

    const{data:product = [], isLoading, isError} = useProducts()
    const{data:categories=[]} = useCategory()

    const[valueSearch, setValueSearch] = useState<string>("")
    const[categorieSearch, setCategorieSearch] = useState<string>("")

    const[nameProduct, setNameProduct] = useState<string>("")
    const[categoryProduct, setCategoryProduct] = useState<string>("")

    const productFilter = product.filter((item) => item.name.toLowerCase().includes(valueSearch.toLowerCase()) && item.category.name.toLowerCase().includes(categorieSearch.toLowerCase()))
    
    console.log(productFilter)

    const searchProduct = () => {
        setValueSearch(nameProduct)
        setCategorieSearch(categoryProduct)
       
        // console.log({
        //     "product": valueSearch,
        //     "category":categorieSearch
        // })
    }

    if(isLoading){
        return(<Loading/>)
    }

 
    return(
        // <div>hola</div>
        <div className="p-2 space-y-2 flex flex-col items-center">
            <div className="w-full justify-between flex items-center 0">
                {/* BARRA BUSQUEDA  + BOTON BUSCAR*/}
                <div className="space-y-3">
                    <div>
                        <input className="bg-white w-80 p-2 rounded-l-2xl border-neutral-500 border-1 outline-none" type="search" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)}/>
                        {/* BOTON BUSCAR */}
                        <input className="bg-white p-2 border-1 w-fit text-center border-neutral-500 rounded-r-2xl cursor-pointer hover:hover:bg-blue-400 " type="button" value="BUSCAR" onClick={searchProduct}/>
                    </div>
                    {/* TEXTO  + BOTON CATEGORIA*/}
                    <div className="flex space-x-2 h-fit">
                        <h1>Categoria:</h1>
                        {categories.length>=1&&(
                            <select className="w-fit" value={categoryProduct} onChange={(e)=>setCategoryProduct(e.target.value)}  >
                            <option value={""}>...</option>
                            {categories.map((categorie)=>(
                                <option value={categorie.name}>{categorie.name.toUpperCase()}</option>
                            ))}
                            </select>
                        )}
                        
                    </div>

                </div>
            </div>

            {/* RESULTADOS DE PRODUCTOS */}

            {productFilter.length==0 &&(
                <div className="flex flex-col w-full text-center text-4xl">
                    <span>No hay productos en esta categoria</span>
                </div>
            )}

            {productFilter.length > 0 &&(
                <>
                    <div>
                        {productFilter.map((products, index)=>(
                            <ItemProducts product={products} key={index} />
                        ))}
                    </div>
                </>

            )}
        </div>
    )

}

export default MenuPage