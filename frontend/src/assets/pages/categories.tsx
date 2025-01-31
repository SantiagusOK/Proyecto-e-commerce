import { useEffect, useState } from 'react'



function CategorieCreatePage() {
  const [categorie, setCategorie] = useState("")

  function saveData(){
    fetch("http://localhost:8000/categories/create",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({name:categorie})
    })
    setCategorie("")
  }

  return (
    <div className='flex flex-col  items-center justify-center h-screen space-y-3'>
      // NOMBRE 
      <label className='text-white' htmlFor="">Nombre de la categoria</label>
      <input className='bg-white w-50' type="text" value={categorie} onChange={(e)=>setCategorie(e.target.value)}/>
      <input type="button" value="AGREGAR" className='bg-red-500 w-50' onClick={saveData}/>

    </div>
  )
}

export default CategorieCreatePage
