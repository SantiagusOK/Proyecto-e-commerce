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
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [categorie, setCategorie] = useState(0)

  function saveData(){
    fetch("http://localhost:8000/products/create",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({name:name, price:price, stock:stock, categories:categorie})
    })
  }

  useEffect(()=>{
    fetch("http://localhost:8000/categories/")
    .then((value) => value.json())
    .then((cate) => setCategoriesList(cate))
  },[])

  return (
    <div className='flex flex-col  items-center justify-center h-screen'>
      // NOMBRE 
      <label className='text-white' htmlFor="">Nombre</label>
      <input className='bg-white w-50' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      
      // PRECIO 
      <label className='text-white' htmlFor="">Precio $</label>
      <input className='bg-white w-50' type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))}/>

      // STOCK 
      <label className='text-white' htmlFor="">Stock</label>
      <input className='bg-white w-50' type="number" value={stock} onChange={(e)=>setStock(Number(e.target.value))}/>
      
      // CATEGORIA 
      <label className='text-white' htmlFor="">CATEGORIA</label>
      <select className='bg-white w-50' name="CATEGORIA" onChange={(e)=>setCategorie(Number(e.target.value))}>
        {categoriesList.map((value)=>(
          <option value={String(value.id)}>{value.name}</option>
        ))}
      </select>

      <input onClick={saveData} className='bg-red-500 w-50 mt-20' type="submit" />
    </div>
  )
}

export default ProductsCreatePage
