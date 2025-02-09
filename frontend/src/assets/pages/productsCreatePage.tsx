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
  const [price, setPrice] = useState(0.0)
  const [stock, setStock] = useState(1)
  const [categorie, setCategorie] = useState(1)

  function saveData(){
    fetch("http://localhost:8000/products/create",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({name:name, price:price, stock:stock, categories:categorie})
    })
    setName("")
    setPrice(0)
    setStock(0)
    
  }

  useEffect(()=>{
    fetch("http://localhost:8000/categories/")
    .then((value) => value.json())
    .then((cate) => setCategoriesList(cate))
  },[])

  return (
    <div className='flex items-center justify-center p-20'>
      <div className='flex flex-col bg-white p-10 pr-20 pl-20 items-center justify-center space-y-5 shadow rounded-2xl'>

        <span>Registrar un producto</span>
        {/* NOMBRE */}
        <input className=' w-50 border-2 border-neutral-400 rounded-2xl p-2 outline-none' placeholder='Nombre del producto' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>

        {/* CATEGORIA */}
        <select className=' w-50 outline-none border-2 border-neutral-400 rounded-2xl p-2' name="CATEGORIA" onChange={(e)=>setCategorie(Number(e.target.value))}>
          {categoriesList.map((value)=>(
            <option value={String(value.id)}>{value.name}</option>
          ))}
        </select>

        {/* PRECIO */}
        <div className=' w-50 border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex items-center justify-center'>
          <span className=''>$</span>
          <input className='outline-none' placeholder='0'  onChange={(e)=>setPrice(Number(e.target.value))}/>
        </div>
        
        {/* CANTIDAD */}
        <div className=' w-50 border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex items-center justify-center'>
          <span className=''>x</span>
          <input className='outline-none' placeholder='1'  onChange={(e)=>setPrice(Number(e.target.value))}/>
        </div>

        <input onClick={saveData} className='bg-blue-400 rounded-2xl p-2 w-50 text-white transition duration-200 hover:scale-110 cursor-pointer' type="submit" value={"Registrar producto"} />
      </div>
      
     
        
    </div>
  )
}

export default ProductsCreatePage
