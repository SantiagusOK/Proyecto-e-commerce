import {  useState } from 'react'
import { useForm } from 'react-hook-form'


export const CreateRolePage = () => {
  const [role, setRole] = useState("")
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [dataSaved, setDataSaved] = useState<boolean>(false)
  const [dataError, setDataError] = useState<boolean>(false)
  const [messageSaved, setMessageSaved] = useState<string>("")
  const [messageError, setMessageError] = useState<string>("")
  const {register,handleSubmit, formState:{errors}} = useForm()


  const saveData = async () => {
    setLoadingData(true)
    setDataSaved(false)
    setDataError(false)
    const response = await fetch("http://localhost:8000/role/create",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({roleName:role})
    })

    if(response.status == 401){
      const data = await response.json()
      setDataError(true)
      setMessageError(data.detail)
    }

    if(response.status == 201){
      const data = await response.json()
      setDataSaved(true)
      setMessageSaved(data.detail)
    }

    setLoadingData(false)
  }

  return (
    <div className='flex  items-center justify-center p-20 space-y-3'>
      
      <div className='flex flex-col items-center justify-center bg-white p-5 pr-10 pl-10 space-y-5 rounded-2xl'>
        <span>Registrar un rol</span>
        <form className='space-y-5 items-center justify-center flex flex-col' onSubmit={handleSubmit(saveData)}>

          {/* NOMBRE DEL ROL */}
          <div className='flex flex-col items-center justify-center'>
            {errors.nombre &&<span className='text-red-600 '>{errors.nombre.message}</span>}
            <input {...register("nombre",{
            required:"Campo esta vacio",
            minLength:{
              value:3,
              message:"Tiene que haber como minimo 3 letras"
            },
            maxLength:{
              value:15,
              message:"Tiene que haber como maximo 10 letras"
            }
            })} className='w-50 rounded-[5px] border-2 border-neutral-400 p-2 outline-none' type="text" value={role} placeholder='Nombre de la categoria' onChange={(e)=>setRole(e.target.value)}/> 
          </div>
          {dataSaved &&(<span className='text-green-500'>{messageSaved}</span>)}
          {dataError &&(<span className='text-red-500'>{messageError}</span>)}
          <button type="submit" className='bg-blue-400 w-50 text-white p-2 text-center rounded-[5px] transition duration-300 hover:bg-blue-600 cursor-pointer flex items-center justify-center '>
            {loadingData &&(<div className='h-5 w-5 rounded-full border-2 border-t-blue-200 border-transparent animate-spin mr-3'></div>)}
            Registrar Rol
          </button>
        
        </form>
       
      </div>
        
    </div>
  )
}