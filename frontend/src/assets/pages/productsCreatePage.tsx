import { useEffect, useState } from 'react'




interface DataCategoriesList{
  id:number,
  name:string
}

interface Categorie{
  id:number,
}

function ProductsCreatePage() {

  const [categoriesList, setCategoriesList] = useState<DataCategoriesList[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState(1)
  const [stock, setStock] = useState(1)
  const [categorie, setCategorie] = useState(1)

  function saveData(){
    console.log(stock)
    // fetch("http://localhost:8000/products/create",{
    //   method: "POST",
    //   headers: {"Content-Type" : "application/json"},
    //   body: JSON.stringify({name:name, price:price, stock:stock, categories:categorie})
    // })
    // setName("")
    // setPrice(0)
    // setStock(0)
    
  }



  useEffect(()=>{
    fetch("http://localhost:8000/categories/")
    .then((value) => value.json())
    .then((cate) => setCategoriesList(cate))
  },[])

  return (
    <div className='flex items-center justify-center h-screen'>
      
      <div className='bg-white p-5 pl-10 pr-10 rounded-2xl flex flex-col items-center justify-center space-y-5 shadow'>
        <span>Registrar un producto</span>
        
        <input className='w-50 border-2 rounded-[5px] p-2 border-neutral-400' type="text" placeholder='Nombre del producto' value={name} onChange={(e)=>setName(e.target.value)}/>

        <select className='w-50 flex border-2 rounded-[5px] p-2 border-neutral-400' name="CATEGORIA" onChange={(e)=>setCategorie(Number(e.target.value))}>
          {categoriesList.map((value)=>(
            <option value={String(value.id)}>{value.name}</option>
          ))}
        </select>
        
        {/* // PRECIO  */}
        
        <div className='w-50 flex border-2 rounded-[5px] p-2 border-neutral-400 space-x-0.5'>
          <span>$</span>
          <input className='w-50 flex outline-none' type="number" min="1"  placeholder='00.00'  onChange={(e)=>setPrice(parseFloat(e.target.value))}/>
        </div>
          

        {/* // STOCK  */}
        <div className='w-50 flex border-2 rounded-[5px] p-2 border-neutral-400 space-x-0.5'>
          <span>x</span>
          <input className='outline-none' type="number" min="1" placeholder='1' onChange={(e)=>setStock(Number(e.target.value))}/>
        </div>
        {/* // CATEGORIA  */}
        
        

        <input onClick={saveData} className='bg-blue-300 p-2 rounded-2xl w-50 text-white transition duration-300 hover:scale-115 cursor-pointer' type="submit" value={"Registrar producto"} />
      </div>
      {/* // NOMBRE  */}
        
    </div>
  )
}

export default ProductsCreatePage
