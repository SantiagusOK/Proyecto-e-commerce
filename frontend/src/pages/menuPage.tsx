import { useState } from "react"
import ItemProducts from "../components/ItemProduct"
import Loading from "../components/loading"
import { useProducts } from "../hooks/products_hooks"
import { useCategories } from "../hooks/category_hooks"

const MenuPage = () => {

    const{data:product = [], isLoading, isError} = useProducts()
    const{data:categories=[], isLoading:loadingCartegory} = useCategories()
    const[valueSearch, setValueSearch] = useState<string>("")
    const[categorieSearch, setCategorieSearch] = useState<string>("")
    const[nameProduct, setNameProduct] = useState<string>("")
    const [positionPage, setPosition] = useState<number>(1)
    const [limitInitial, setLimitInitial] = useState<number>(0)
    const [limitFinal, setLimitFinal] = useState<number>(6)

    const limitToShow = 6
    
    
    const productFilter = product.filter((item) => item.name.toLowerCase().includes(valueSearch.toLowerCase()) && item.category.name.toLowerCase().includes(categorieSearch.toLowerCase()))

    const limitPage = productFilter.length / limitToShow
    
    const changePosition = (type:string) => {
        switch(type){
            case "+":
                setLimitInitial( e => e + limitToShow)
                setLimitFinal( e => e + limitToShow)
                setPosition( e => e + 1)
                return window.scrollTo({ top: 0, behavior: "smooth" });
            
            case "-":
                if(positionPage > 1){
                    setLimitInitial( e => e - limitToShow)
                    setLimitFinal( e => e - limitToShow)
                    setPosition( e => e - 1)
                    return window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }
      
    const searchProduct = () => {
        setValueSearch(nameProduct)
    }

    if(isLoading || loadingCartegory){
        return(<Loading/>)
    }

    return(
        <div className="flex items-start justify-center p-10">
            {product.length >= 1 ? (
                <>
                    
                    <div className="space-y-3">

                        <div className="flex">
                            <input className="bg-neutral-700 w-80 p-2 rounded-l border-neutral-500 border-1 outline-none text-white" type="search" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)}/>
                            {/* BOTON BUSCAR */}
                            <input className="bg-white p-2 border-1 w-fit text-center border-neutral-500 rounded-r cursor-pointer hover:hover:bg-blue-400 " type="button" value="BUSCAR" onClick={searchProduct}/>
                        </div>
    
                        <div className="flex space-x-2 h-fit ">
                            <h1 className="text-white font-bold">Categoria:</h1>
                            {categories.length>=1&&(
                                <select className="w-fit  bg-white" value={categorieSearch} onChange={value => setCategorieSearch(value.target.value)}  >
                                <option value={""}>TODOS</option>
                                {categories.map((categorie)=>(
                                    <option value={categorie.name}>{categorie.name.toUpperCase()}</option>
                                ))}
                                </select>
                            )}
                        </div>    
                        
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-3 px-10">
 
                        {productFilter.length > 0 &&(
                            <div className=" grid grid-cols-3 gap-x-4 gap-y-4  w-250" >
                                {productFilter.slice(limitInitial, limitFinal).map((products, index)=>(
                                    <ItemProducts product={products} key={index} />
                                ))}
                            </div>
                        )}

                        {productFilter.length===0 &&(
                            <div className="flex flex-col w-full text-center text-4xl text-white" >
                                <span>No hay productos en esta categoria :(</span>
                            </div>
                        )}
            
                        <div className="flex space-x-2">
                            <button  onClick={() => changePosition("-")} className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${positionPage == 1 ? "invisible" : "visible"}`}> {"<"} </button>
                            <p className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${productFilter.length < limitToShow ? "invisible" : "visible"}`}>{positionPage}</p>
                            <button  disabled={positionPage == Math.ceil(limitPage)} onClick={() => changePosition("+")} className={`text-2xl text-white bg-neutral-600 py-1 px-5 ${positionPage == Math.ceil(limitPage) ? "invisible" : "visible"}`}> {">"} </button>
                        </div>
                    </div>
        
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