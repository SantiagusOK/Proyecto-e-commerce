import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from 'react-router-dom'
import Loading from '../components/loading'



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
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState(1)
  const [categorie, setCategorie] = useState(1)

  const {register, handleSubmit, formState:{errors}} = useForm() 

  const[loadingData, setLoadingData] = useState<boolean>(false)
  const[dataSaved, setDataSave] = useState<boolean>(false)
  const[dataError, setDataError] = useState<boolean>(false)

  const[messageCreate , setMessageCreate] = useState<string>("")
  const[messageError , setmessageError] = useState<string>("")

  const[loading, setLoading] = useState<boolean>(false)



  const saveData=async()=>{
    if(categoriesList.length >= 1){

      setLoadingData(true)
      setDataSave(false)
      setDataError(false)
      const response = await fetch("http://localhost:8000/products/create",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({name:name, price:parseFloat(price), stock:stock, categories:categorie})
      })
  
      if(response.status == 201){
        const data = await response.json()
        setMessageCreate(data.detail)
        setDataSave(true)
        setName("")
        setPrice("")
        setStock(0)
        setLoadingData(false)
      } 
      if(response.status == 401){
        const data = await response.json()
        setmessageError(data.detail)
        setDataError(true)
        setLoadingData(false)
      }
    }
  }

  useEffect(()=>{
    get_all_categories()
  },[])
  
  const get_all_categories = async () => {
    setLoading(true)
    await fetch("http://localhost:8000/categories/")
    .then((value) => value.json())
    .then((cate) => setCategoriesList(cate))
    setLoading(false)
    console.log(categoriesList.length)
  }

  const onChangePrice=(e)=>{
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  }

  if(loading){
    return(
      <Loading/>
    )
  }

  return (
    <div className='flex items-center justify-center p-20'>
      <div className='flex flex-col bg-white p-10 pr-20 pl-20 items-center justify-center space-y-5 shadow rounded-2xl'>

        <span>Registrar un producto</span>
        
        <form onSubmit={handleSubmit(saveData)} className='flex flex-col items-center justify-center space-y-4'>
          {/* NOMBRE */}
          <div className='flex flex-col'>
            {errors.nombre && <span className='text-red-500 font-medium'>{errors.nombre.message}</span>}
            <input {...register("nombre",{
              required:"Este campo esta vacio"
            })} className=' w-full border-2 border-neutral-400 rounded-2xl p-2 outline-none' placeholder='Nombre del producto' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          
          {/* CATEGORIA */}

          <select className=' w-50 outline-none border-2 border-neutral-400 rounded-2xl p-2' name="CATEGORIA" onChange={(e)=>setCategorie(Number(e.target.value))}>
            {categoriesList.length > 0&&(
              <>
                {categoriesList.map((value)=>(
                  <option value={String(value.id)}>{value.name}</option>
                ))}
              </>
            )}
          </select>

          {/* PRECIO */}
          <div className='flex flex-col items-center justify-center'>
            {errors.precio && <span className='text-red-500 font-medium'>{errors.precio.message}</span>}
            <div className=' w-50 border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex items-center justify-center'>
              <span>$</span>
              <input {...register("precio",{
                required: "Este campo es requerido",
                maxLength:{
                  value: 5,
                  message: "El precio tiene que ser menor a 5 digitos"
                },
                validate: (value) => value > 0 || "El precio tiene que ser mayor a 0"
              })} className='outline-none' placeholder='0' value={price} onChange={onChangePrice} type='text' maxLength={9}/>
            </div>
          </div>
          
          {/* CANTIDAD */}
          <div className='flex flex-col items-center justify-center'>
          {errors.cantidad && <span className='text-red-500 font-medium'>{errors.cantidad.message}</span>}
            <div className=' w-50 border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex items-center justify-center'>
              <span className=''>x</span>
              <input {...register("cantidad",{
                required:"Este campo esta vacio",
                minLength:{
                  value: 1,
                  message: "La cantidad tiene que ser minimo 1 digito"
                },
                maxLength:{
                  value:4,
                  message: "La cantidad tiene que tener maximo 5 digitos"
                },

                validate:(value)=>value > 0 || "La cantidad tiene que ser mayor a 0" 
              })} className='outline-none' placeholder='1' value={stock} onChange={(e)=>setStock(Number(e.target.value))}/>
            </div> 
          </div>
          
          <button className='bg-blue-400 rounded-2xl p-2 w-50 text-white transition duration-200 hover:bg-blue-600  cursor-pointer flex items-center justify-center' type="submit">
            {loadingData && <div className='border-2 h-5 w-5 border-t-blue-200 border-transparent rounded-full animate-spin mr-2'></div>}
            Registrar Producto
          </button>
          {dataSaved && <span className='text-green-600 font-bold'>{messageCreate}</span>}
          {dataError && <span className='text-red-700 font-bold'>{messageError}</span>}

        </form>
        
      </div>
      
     
        
    </div>
  )
}

export default ProductsCreatePage
