import { useEffect, useState } from 'react'



function UserCreatePage() {

  function saveData(){
    fetch("http://localhost:8000/categories/create",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({name:categorie})
    })
    setCategorie("")
  }

  return (
    <div className='flex flex-col  items-center justify-center h-screen space-y-1'>
      // NOMBRE 
      <div className='flex flex-col items-center'>
        <label className='text-white' htmlFor="">Nombre</label>
        <input className='bg-white w-50' type="text"/>
      </div>

      // APELLIDO 
      <div className='flex flex-col items-center'>
        <label className='text-white' htmlFor="">Apellido</label>
        <input className='bg-white w-50' type="text"/>
      </div>

      // FECHA DE NACIMIENTO 
      <div className='flex flex-col items-center'>
        <label className='text-white' htmlFor="">Apellido</label>
        <input className='bg-white w-50' type="date" />
      </div>

      // Email 
      <div className='flex flex-col items-center'>
        <label className='text-white' htmlFor="">Correo Electronico</label>
        <input className='bg-white w-50' type="email" />
      </div>

      // Contraseña 
      <div className='flex flex-col items-center'>
        <label className='text-white' htmlFor="">Contraseña</label>
        <input className='bg-white w-50' type="password"/>
      </div>

      // Contraseña 2do
      <div className='flex flex-col items-center'>
        <label className='text-white' htmlFor="">Inserte de nuevo la Contraseña</label>
        <input className='bg-white w-50' type="password"/>
      </div>
      
      <input type="button" value="AGREGAR" className='bg-red-500 w-50' onClick={saveData}/>

    </div>
  )
}

export default UserCreatePage
