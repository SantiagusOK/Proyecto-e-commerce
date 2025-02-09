import {  useState } from 'react'



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
    <div className='flex  items-center justify-center p-20 space-y-3'>
      
      <div className='flex flex-col items-center justify-center bg-white p-5 pr-10 pl-10 space-y-5 rounded-2xl'>

        <span>Registrar una categoria</span>

        {/* NOMBRE DE LA CATEGORIA */}
        <input className='w-50 rounded-[5px] border-2 border-neutral-400 p-2 outline-none' type="text" value={categorie} placeholder='Nombre de la categoria' onChange={(e)=>setCategorie(e.target.value)}/>

        <input type="button" value="Registrar categoria" className='bg-blue-400 w-50 text-white p-2 text-center rounded-[5px] transition duration-300 hover:scale-110 cursor-pointer' onClick={saveData}/>
      </div>
        
    </div>
  )
}

export default CategorieCreatePage
