import { useEffect, useState } from 'react'



const UserCreatePage = () =>{

  const[name,setName] = useState<string>("")
  const[lastname,setLastname] = useState<string>("")
  const[birthdate,setbirthdate] = useState<string>("")
  const[email,setEmail] = useState<string>("")
  const[password,setPassword] = useState<string>("")
  const[passwordSecond,setPasswordSecond] = useState<string>("")
  const[username,setUsername] = useState<string>("")

  const saveData = () =>{
    console.log(birthdate)
    if(password==passwordSecond){
      fetch("http://localhost:8000/users/create",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({fullname:name, lastname:lastname, username:username, birthdate:birthdate, email:email, password:password})
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
    <div className='flex flex-col  items-center justify-center h-screen space-y-1'>
      {/* NOMBRE  */}
      <div className='flex flex-col items-center'>
        <label className='' htmlFor="">Nombre</label>
        <input className='w-50 border-2' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

       {/* APELLIDO  */}
      <div className='flex flex-col items-center'>
        <label className='' htmlFor="">Apellido</label>
        <input className='w-50 border-2' type="text" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
      </div>

      {/* USERNAME  */}
      <div className='flex flex-col items-center'>
        <label className='' htmlFor="">Nombre de usuario</label>
        <input className='w-50 border-2' type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
      </div>

       {/* FECHA DE NACIMIENTO  */}
      <div className='flex flex-col items-center'>
        <label className='' htmlFor="">Fecha de nacimiento</label>
        <input className='w-50 border-2' type="date" value={birthdate} onChange={(e)=>setbirthdate(e.target.value)}/>
      </div>
       {/* Email  */}
      <div className='flex flex-col items-center'>
        <label className='' htmlFor="">Correo Electronico</label>
        <input className='w-50 border-2' type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>

       {/* Contraseña  */}
      <div className='flex flex-col items-center'>
        <label className='' htmlFor="">Contraseña</label>
        <input className='w-50 border-2' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>

       {/* Contraseña 2do */}
      <div className='flex flex-col items-center'>
        <label className='' htmlFor="">Inserte de nuevo la Contraseña</label>
        <input className='w-50 border-2' type="password" value={passwordSecond} onChange={(e)=>setPasswordSecond(e.target.value)}/>
      </div>
      
      <input type="button" value="AGREGAR" className='bg-red-500 w-50' onClick={saveData}/>

    </div>
  )
}

export default UserCreatePage
