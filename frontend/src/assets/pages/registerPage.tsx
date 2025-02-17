import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'



const UserCreatePage = () =>{

  const[name,setName] = useState<string>("")
  const[lastname,setLastname] = useState<string>("")
  const[birthdate,setbirthdate] = useState<string>("")
  const[email,setEmail] = useState<string>("")
  const[password,setPassword] = useState<string>("")
  const[passwordSecond,setPasswordSecond] = useState<string>("")
  const[username,setUsername] = useState<string>("")
  const[direccion,setDireccion] = useState<string>("")

  const[usernameError, setUsernameError] = useState<boolean>(false)
  const[usernameErrorText, setUsernameErrorText] = useState<string>("")
  const[usuarioCreado, setUsuarioCreado] = useState<boolean>(false)
  const[loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const {register, handleSubmit, watch,
    formState: {errors}} = useForm()

  console.log(errors)

  const saveData = async () =>{
    if(!usuarioCreado){
      setLoading(true)
      try{
        const response = await fetch("http://localhost:8000/users/registerUser",{
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({fullname:name, lastname:lastname, username:username, birthdate:birthdate, email:email, password:password, direccion:direccion})
          })
        
        if (response.status==401){
          const data = await response.json()
          setUsernameError(true)
          setUsernameErrorText(data.detail)
        }

        if(response.status==201){
          setUsuarioCreado(true)
          // resetAllData()
        }

        setLoading(false)
      } catch{
        console.log("ERROR")
      }
    }

  }

  const resetAllData=()=>{
    setName("")
    setLastname("")
    setbirthdate("")
    setEmail("")
    setPassword("")
    setUsername("")
    setDireccion("")
    setPasswordSecond("")
  }

  const validarAño=(fecha:any)=>{
    const year = new Date(fecha).getFullYear()
    return year <= 2007 || "Debes ser mayor de edad"
  }

  useEffect(()=>{
    if(usuarioCreado){
      const timer = setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  },[usuarioCreado])

  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-10'>

      <div className='bg-white p-10 w-fit rounded-2xl flex flex-col items-center space-y-10 drop-shadow-md'>

        <h1 className='mb-5'>REGISTRASE</h1>
        
        <form className='flex flex-col items-center space-y-4' onSubmit={handleSubmit(saveData)} >

          <div className='flex space-x-2'>
            <div className='flex flex-col'>
              {/* NOMBRE */}
              {errors.nombre &&(<span className="text-red-500 font-medium">{errors.nombre.message}</span>)}
              <input {...register("nombre",{
                required: "Inserte su nombre"
              })} className='w-80 border-2 rounded p-2   outline-none border-neutral-400' placeholder='Nombre' type="text"  value={name} onChange={(e)=>setName(e.target.value)} />  
            </div>

            {/* APELLIDO */}
            <div className='flex flex-col'>
              {errors.apellido &&(<span className="text-red-500 font-medium">{errors.apellido.message}</span>)}
              <input {...register("apellido",{
                required: "Inserte su apellido"
              })} className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Apellido' type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
            </div>            
          </div>

          <div className='h-0.5 bg-neutral-400 w-full'></div>
          
          <div className='flex space-x-2'>
            {/* USERNAME  */}
            <div className='flex flex-col'>
              {usernameError &&(<span className="text-red-500 font-medium">{usernameErrorText}</span>)}
              {errors.username &&(<span className="text-red-500 font-medium">{errors.username.message}</span>)}
              <input {...register("username",{
                required:"Inserte su nombre de usuario"
              })} className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Nombre de Usuario' type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>            
            </div>

            {/* DIRECCION  */}
            <div className='flex flex-col'>
              {errors.direccion &&(<span className="text-red-500 font-medium">{errors.direccion.message}</span>)}
              <input {...register("direccion",{
                required:"Inserte su direccion"
              })} className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Direccion o calle' type="text" value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
            </div>
          </div>

          <div className='h-0.5 bg-neutral-400 w-full'></div>

          <div className='flex space-x-2'>
            {/* FECHA DE NACIMIENTO  */}
            <div className='flex flex-col'>
              {errors.fecha &&(<span className="text-red-500 font-medium">{errors.fecha.message}</span>)}
              <input {...register("fecha",{
                required:"Inserte su fecha de nacimiento",
                validate:validarAño
              })} className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Fecha de nacimiento' type="date" value={birthdate} onChange={(e)=>setbirthdate(e.target.value)}/>
            </div>
          
            
            {/* Email  */}
            <div className='flex flex-col'>
              {errors.email &&(<span className="text-red-500 font-medium">{errors.email.message}</span>)}
              <input {...register("email",{
                required:"Inserte su correo electronico",
                pattern:{
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:"El correo electronico no es valido"
                }
              })} className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Correo electronico' type="email" value={email}  onChange={(e)=>setEmail(e.target.value)}  />            
            </div>
          </div>

          <div className='h-0.5 bg-neutral-400 w-full'></div>

          <div className='flex space-x-2'>
            {/* Contraseña  */}
            <div className='flex flex-col'>
              {errors.contraseña &&(<span className="text-red-500 font-medium">{errors.contraseña.message}</span>)}
              <input {...register("contraseña",{
                required:"Inserte su contraseña"
              })} className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Contraseña' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>            
            </div>

            {/* Contraseña 2do */}
            <div className='flex flex-col'>
              {errors.contraseña2 &&(<span className="text-red-500 font-medium">{errors.contraseña2.message}</span>)}
              <input {...register("contraseña2",{
                required:"inserte su contraseña nueva mente",
                validate:(value)=>
                  value==password || "La contraseña no coinciden"
              })} className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Confirmar contraseña' type="password" value={passwordSecond} onChange={(e)=>setPasswordSecond(e.target.value)}/>
            </div>
          </div>

          <button type="submit" value="Registrarte" className={` w-80 p-2 rounded-[10px] mt-5 cursor-pointer flex justify-center items-center transition  space-x-4 ${usuarioCreado ? "bg-green-500" : "bg-blue-300 hover:bg-blue-500" }`}>
            {loading&&(
              <div className='border-t-4 border-t-blue-400 border-transparent rounded-full border-4 h-6 w-6 animate-spin'></div>
            )}
            <span className={`text-white ${usuarioCreado ? "transition text-black" : "text-white"}`}>{usuarioCreado ? "Usuario registrado con exito" : "Registrarse"}</span>
          </button>

        </form>
        
        <div className="flex flex-col items-center justify-center">
          <h1 className="">¿Ya estas registrado?</h1>
          <NavLink to={"/loginPage"} className={"text-blue-500 underline"}>Inicia sesion ahora</NavLink>
        </div>

        
        
      </div>
    
    </div>
  )
}

export default UserCreatePage
