import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { NavLink } from 'react-router-dom'



const UserCreatePage = () =>{

  const[name,setName] = useState<string>("")
  const[lastname,setLastname] = useState<string>("")
  const[birthdate,setbirthdate] = useState<string>("")
  const[email,setEmail] = useState<string>("")
  const[password,setPassword] = useState<string>("")
  const[passwordSecond,setPasswordSecond] = useState<string>("")
  const[username,setUsername] = useState<string>("")
  const[direccion,setDireccion] = useState<string>("")

  const {register, handleSubmit,
    formState: {errors}, watch
  } = useForm()

  const onSubmit = handleSubmit((data)=>{
    console.log(data)
  })

  console.log(errors)

  const saveData = () =>{
    console.log(birthdate)
    if(password==passwordSecond){
      fetch("http://localhost:8000/users/registerUser",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({fullname:name, lastname:lastname, username:username, birthdate:birthdate, email:email, password:password, direccion:direccion})
          })
      
    } else {
      setPassword("")
      setUsername("")
    }
  }

  const resetAllData=()=>{
    setName("")
    setLastname("")
    setbirthdate("")
    setEmail("")
    setPassword("")
    setUsername("")
    setPasswordSecond("")
  }



  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-10'>

      <div className='bg-white p-10 w-150 rounded-2xl flex flex-col items-center space-y-10 shadow-2xl'>

        <h1 className='mb-5'>CREARSE UNA CUENTA</h1>
        

        <form className='flex flex-col items-center space-y-4' onSubmit={onSubmit} >
            


            {/* NOMBRE */}
            
          
          <input  className='w-80 border-2 rounded p-2   outline-none border-neutral-400' placeholder='Nombre' type="text"  value={name} onChange={(e)=>setName(e.target.value)} />
          
            


            {/* APELLIDO */}
          
          <input  className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Apellido' type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
            
         

          {/* USERNAME  */}
          
          <input  className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Nombre de Usuario' type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>


          {/* DIRECCION  */}
          
          <input  className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Direccion o calle' type="text" value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
          

            {/* FECHA DE NACIMIENTO  */}
          
          <input  className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Fecha de nacimiento' type="date" value={birthdate} onChange={(e)=>setbirthdate(e.target.value)}/>
          
            {/* Email  */}
          
          <input  className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Correo electronico' type="email" value={email}  onChange={(e)=>setEmail(e.target.value)}  />
          

            {/* Contraseña  */}
          
          <input  className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Contraseña' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          

            {/* Contraseña 2do */}
          <input  className='w-80  border-2 rounded p-2 border-neutral-400  outline-none' placeholder='Confirmar contraseña' type="password" value={passwordSecond} onChange={(e)=>setPasswordSecond(e.target.value)}/>
        
          <input type="submit" value="Registrarte" className='bg-blue-300 w-80 p-2 rounded-[10px] mt-5' onClick={saveData}/>

          <div className="flex flex-col items-center justify-center">
                <h1 className="">¿Ya estas registrado?</h1>
                <NavLink to={"/loginPage"} className={"text-blue-500 underline"}>
                  Inicia sesion ahora
                </NavLink>
            </div>
          
        </form>
            
        
      </div>
      

    </div>
  )
}

export default UserCreatePage
