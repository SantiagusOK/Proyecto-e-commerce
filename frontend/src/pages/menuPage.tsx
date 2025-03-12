import { useState } from "react"
import ItemProducts from "../components/ItemProduct"
import Loading from "../components/loading"
import { useProducts } from "../hooks/products_hooks"
import { useCategory } from "../hooks/category_hooks"

const MenuPage = () => {

    const{data:product = [], isLoading, isError} = useProducts()
    const{data:categories=[], isLoading:loadingCartegory} = useCategory()
    const[valueSearch, setValueSearch] = useState<string>("")
    const[categorieSearch, setCategorieSearch] = useState<string>("")
    const[nameProduct, setNameProduct] = useState<string>("")
    const[categoryProduct, setCategoryProduct] = useState<string>("")

    const productFilter = product.filter((item) => item.name.toLowerCase().includes(valueSearch.toLowerCase()) && item.category.name.toLowerCase().includes(categorieSearch.toLowerCase()))
      
    const searchProduct = () => {
        setValueSearch(nameProduct)
        setCategorieSearch(categoryProduct)
    }

    if(isLoading || loadingCartegory){
        return(<Loading/>)
    }

    return(
        <div className="p-2 space-y-2 flex flex-col items-center">
            {product.length >= 1 ? (
                <>
                    <div className="w-full justify-between flex items-center 0">
                        <div className="space-y-3">
        
                            <div>
                                <input className="bg-neutral-700 w-80 p-2 rounded-l border-neutral-500 border-1 outline-none text-white" type="search" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)}/>
                                {/* BOTON BUSCAR */}
                                <input className="bg-white p-2 border-1 w-fit text-center border-neutral-500 rounded-r cursor-pointer hover:hover:bg-blue-400 " type="button" value="BUSCAR" onClick={searchProduct}/>
                            </div>
        
                            <div className="flex space-x-2 h-fit ">
                                <h1 className="text-white font-bold">Categoria:</h1>
                                {categories.length>=1&&(
                                    <select className="w-fit  bg-white" value={categoryProduct} onChange={(e)=>setCategoryProduct(e.target.value)}  >
                                    <option value={""}>...</option>
                                    {categories.map((categorie)=>(
                                        <option value={categorie.name}>{categorie.name.toUpperCase()}</option>
                                    ))}
                                    </select>
                                )}
                            </div>
        
                        </div>
        
                    </div>
        
                    {productFilter.length===0 &&(
                        <div className="flex flex-col w-full text-center text-4xl">
                            <span>No hay productos en esta categoria</span>
                        </div>
                    )}
        
                    {productFilter.length > 0 &&(
                        <div className="grid grid-cols-1 w-[60%] gap-x-4 md:grid-cols-2 lg:grid-cols-3">
                            {productFilter.map((products, index)=>(
                                <ItemProducts product={products} key={index} />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="h-screen flex items-center justify-center space-x-10 text-white">
                    <p className="text-9xl">:(</p>
                    <p className="text-3xl w-25">No hay productos registrados</p>
                </div>
            )}
        </div>
    )
}

export default MenuPage