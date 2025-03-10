import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Loading from '../components/loading'
import { useCategory } from '../hooks/category_hooks'


function ProductsCreatePage() {

  const{data:categories=[], isLoading} = useCategory()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stockCurrent, setStockCurrent] = useState<number>(1)
  const [stockMax, setStockMax] = useState<number>(1)
  const [stockMin, setStockMin] = useState<number>(1)
  const [categorie, setCategorie] = useState(1)
  const [description, setDescription] = useState<string>("")

  const {register, handleSubmit, formState:{errors}} = useForm() 

  const[loadingData, setLoadingData] = useState<boolean>(false)
  const[dataSaved, setDataSave] = useState<boolean>(false)
  const[dataError, setDataError] = useState<boolean>(false)

  const[messageCreate , setMessageCreate] = useState<string>("")
  const[messageError , setmessageError] = useState<string>("")

  

  const saveData=async()=>{
    if(categories.length >= 1){
      
      const category_data = categories.find((anCategorie) => anCategorie.id.toString() === categorie.toString())

      const product_response = {
        product:{
          name:name,
          price:parseFloat(price),
          id_category:category_data?.id,
          description:description,
          stockMin:stockMin,
          stockMax:stockMax,
          stockCurrent:stockCurrent,
        },
        category:{
          id:category_data?.id,
          name:category_data?.name,
          description:category_data?.description
        }
      }

      setLoadingData(true)
      setDataSave(false)
      setDataError(false)

      console.log(product_response)
      const response = await fetch("http://localhost:8000/product/create",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(product_response)
      })
  
      if(response.status == 401){
        const data = await response.json()
        setmessageError(data.detail)
        setDataError(true)
      }
      
      if(response.ok){
        const data = await response.json()
        setDataSave(true)
        setMessageCreate("Producto registrado")
        setName("")
        setPrice("")
        setStockCurrent(0)
        setStockMax(0)
        setStockMin(0)
        setDescription("")
        setLoadingData(false)
      } 

      setLoadingData(false)
    }
  }

  const onChangePrice=(e)=>{
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  }

  if(isLoading){
    return(
      <Loading/>
    )
  }

  // console.log("Lista de categoria: " + categories)

  return (
    <div className='flex justify-center p-2'>
      <div className='w-300 flex flex-col bg-white p-10  items-center justify-center space-y-5 shadow rounded-2xl'>

        <span className='text-3xl font-bold bg-blue-300 w-full text-center p-4 rounded-2xl'>Registrar un producto</span>
        
        <form onSubmit={handleSubmit(saveData)} className='flex flex-col w-full items-center justify-center space-y-4'>

          {/* NOMBRE */}
          <div className='flex flex-col w-full space-x-3'>

            <div className='flex w-full space-x-2'>
              <span>Nombre del producto</span>
              {errors.nombre && <span className='text-red-500 font-medium'>{errors.nombre.message}</span>}
            </div>

            <div className='flex'>

              <input {...register("nombre",{
                required:"Este campo esta vacio"
              })} className=' w-full border-2 border-neutral-400 rounded-2xl p-2 outline-none' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            
              {/* CATEGORIA */}
              <select className=' w-50 outline-none border-2 border-neutral-400 rounded-2xl p-2' name="CATEGORIA" onChange={(e)=>setCategorie(Number(e.target.value))}>
                {categories.length > 0&&(
                  <>
                    {categories.map((value)=>(
                      <option value={value.id}>{value.name}</option>
                    ))}
                  </>
                )}
              </select>
            </div>

          </div>

          {/* PRECIO */}
          <div className='flex flex-col w-full' >

            <div className='flex space-x-2'>
              <span>Precio</span>
              {errors.precio && <span className='text-red-500 font-medium'>{errors.precio.message}</span>}
            </div>

            <div className='w-full border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex items-center justify-start'>
              <span>$</span>
              <input {...register("precio",{
                required: "Este campo es requerido",
                maxLength:{
                  value: 5,
                  message: "El precio tiene que ser menor a 5 digitos"
                },
                validate: (value) => value > 0 || "El precio tiene que ser mayor a 0"
              })} className='outline-none w-full' value={price} onChange={onChangePrice} type='text' maxLength={9}/>
            </div>

          </div>
          
          {/* STOCK MAXIMO */}
          <div className='flex flex-col w-full'>

            <div className='space-x-2'>
              <span>Stock Maximo</span>
              {errors.stockMax && <span className='text-red-500 font-medium'>{errors.stockMax.message}</span>}
            </div>

            <div className=' w-full border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex'>
              <span className=''>x</span>
              <input {...register("stockMax",{
                required:"Este campo esta vacio",
                minLength:{
                  value: 1,
                  message: "el stockMax tiene que ser minimo 1 digito"
                },
                maxLength:{
                  value:4,
                  message: "el stockMax tiene que tener maximo 5 digitos"
                },

                validate:(value)=>value > 0 || "el stock max tiene que ser mayor a 0" 
              })} className='outline-none w-full' value={stockMax} onChange={(e)=>setStockMax(Number(e.target.value))}/>
            </div> 

          </div>

          {/* STOCK MINIMO */}
          <div className='flex flex-col w-full'>

            <div className='flex space-x-2'>
              <span>Stock Minimo</span>
              {errors.stockMin && <span className='text-red-500 font-medium'>{errors.stockMin.message}</span>}
            </div>

            <div className=' w-full border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex'>
              <span className=''>x</span>
              <input {...register("stockMin",{
                required:"Este campo esta vacio",
                minLength:{
                  value: 1,
                  message: "el stockMin tiene que ser minimo 1 digito"
                },
                maxLength:{
                  value:4,
                  message: "el stockMin tiene que tener maximo 5 digitos"
                },

                validate:(value)=>value > 0 || "el stock min tiene que ser mayor a 0" 
              })} className='outline-none w-full' value={stockMin} onChange={(e)=>setStockMin(Number(e.target.value))}/>
            </div> 

          </div>

          {/* STOCK CONCURRENTE */}
          <div className='w-full flex flex-col'>

            <div className='space-x-2'>
              <span>Stock Concurrente</span>
              {errors.stockCurrent && <span className='text-red-500 font-medium'>{errors.stockCurrent.message}</span>}
            </div>

            <div className=' w-full border-2 border-neutral-400 rounded-2xl p-2 pl-5 flex'>
              <span className=''>x</span>
              <input {...register("stockCurrent",{
                required:"Este campo esta vacio",
                minLength:{
                  value: 1,
                  message: "el stockCurrent tiene que ser minimo 1 digito"
                },
                maxLength:{
                  value:4,
                  message: "el stockCurrent tiene que tener maximo 5 digitos"
                },

                validate:(value)=>value > 0 || "el stockCurrent tiene que ser mayor a 0" 
              })} className='outline-none w-full' value={stockCurrent} onChange={(e)=>setStockCurrent(Number(e.target.value))}/>
            </div> 
          </div>

          {/* DESCRIPCION */}
          <div className='flex flex-col w-full'>

            <div className='flex space-x-2'>
              <span>Descripcion</span>
              {errors.descripcion && <span className='text-red-500 font-medium'>{errors.descripcion.message}</span>}
            </div>

            <div className='border-2 border-neutral-400 rounded-2xl p-2 w-full'>
              <textarea {...register("descripcion",{
                required:"Este campo es requerido"
              })} className='resize  h-full outline-none w-full' placeholder='Descripcion...' onChange={(e)=>setDescription(e.target.value)} maxLength={200} value={description}></textarea>
            </div>
          </div>
          
          <button className='bg-blue-400 rounded-2xl p-2 w-50 text-white transition duration-200 hover:bg-blue-600  cursor-pointer flex items-center justify-center' type="submit">
            {loadingData && <div className='border-2 h-5 w-5 border-t-blue-200 border-transparent rounded-full animate-spin mr-2'></div>}
            Registrar Producto
          </button>
          {dataSaved ? <span className='text-green-600 font-bold'>{messageCreate}</span> : <span>""</span>}
          {dataError && <span className='text-red-700 font-bold'>{messageError}</span>}

        </form>
        
      </div>
    
    </div>
  )
}

export default ProductsCreatePage
