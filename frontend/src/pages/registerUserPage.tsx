import { useForm,  } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useFormData } from '../type/useFormData'
import { useEffect, useState } from 'react'
import { useRegisterUser } from '../hooks/user_hooks'

export const RegisterUserPage = () =>{

  const userMutation = useRegisterUser()
  const[pageVisible, setPageVisible] = useState<boolean>(false)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } =useForm<useFormData>()

  const registerNewUser = async (userData:any)  => {
    console.log(userData)
    userMutation.mutate(userData)
  }

  const verifyPassword = (pass:string) => {
    if(pass === watch("user.password")){
      return true
    } else {
      return "❌La contraseña no coinciden"
    }
  }

  const verifyDate = (value:any) => {
    const dateUser = new Date(value)
    const dateActual = new Date()
    const age = dateActual.getFullYear() - dateUser.getFullYear()

    if(age >= 18){
      return true
    } else {
      return "❌Debes ser mayor de edad para crear una cuenta"
    }

  }

  useEffect(()=>{
          const timer = setTimeout(() => {
              setPageVisible(true);
          }, 10);
  
          return () => clearTimeout(timer);
      },[])

  return(
    <div className='flex flex-col items-center justify-center py-10 space-y-5'>
      
      <form className={`w-200 p-10 space-y-10 shadow text-white transition duration-500 ${pageVisible ? "opacity-100 -translate-y-10" : "opacity-0"}`} onSubmit={handleSubmit(registerNewUser)}>
        
        <p className='w-full text-center text-4xl'>Registrarse</p>
        
        <div className='bg-neutral-700 p-10 rounded space-y-5'>
          
          <div>
            <p>Nombre</p>
            <input {...register("user.fullname",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              minLength:{
                value:4,
                message:"❌El minimo de letras debe de ser de 4"
              },
              pattern:{
                value:/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/u,
                message:"❌Solo se permiten letras, sin espacios ni símbolos"
              }
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={15} placeholder='Nombre' type="text" />
            {errors.user?.fullname && (<p className='text-red-400 font-light'>{errors.user.fullname.message}</p>)}
          </div>

          <div>
            <p>Apellido</p>
            <input {...register("user.lastname",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              minLength:{
                value:4,
                message:"❌El minimo de letras debe de ser de 4"
              },
              pattern:{
                value:/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/u,
                message:"❌Solo se permiten letras, sin espacios ni símbolos"
              }
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={15} placeholder='Apellido' type="text" />
            {errors.user?.lastname && (<p className='text-red-400 font-light'>{errors.user.lastname.message}</p>)}
          </div>

          <div>
            <p>Nombre de usuario</p>
            <input {...register("user.username",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              minLength:{
                value:4,
                message:"❌El minimo de letras debe de ser de 4"
              },
              pattern:{
                value:/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+$/u,
                message:"❌Solo se permiten letras, sin espacios ni símbolos"
              }
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={12} placeholder='Nombre de Usuario' type="text" />
            {errors.user?.username && (<p className='text-red-400 font-light'>{errors.user.username.message}</p>)}
          </div>

          <div>
            <p>Correo electronico</p>
            <input {...register("user.email",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              minLength:{
                value:4,
                message:"❌El minimo de letras debe de ser de 4"
              },
              pattern:{
                value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "❌El formato del correo electrónico no es válido"
              }
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" placeholder='Correo@electronico.com' type="email" />
            {errors.user?.email && (<p className='text-red-400 font-light'>{errors.user.email.message}</p>)}
          </div>

          <div>
            <p>Contraseña</p>
            <input {...register("user.password",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              minLength:{
                value:4,
                message:"❌La contraseña tiene que tener un minimo de 4 digitos"
              },
              

            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={20} placeholder='111111' type="password" />
            {errors.user?.password && (<p className='text-red-400 font-light'>{errors.user.password.message}</p>)}
          </div>

          <div>
            <p>Confirma la contraseña</p>
            <input {...register("user.passwordSecond",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              minLength:{
                value:4,
                message:"❌La contraseña tiene que tener un minimo de 4 digitos"
              },
              validate:verifyPassword

            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={20} placeholder='111111' type="password" />
            {errors.user?.passwordSecond && (<p className='text-red-400 font-light'>{errors.user.passwordSecond.message}</p>)}
          </div>

          <div>
            <p>Fecha de nacimiento</p>
            <input {...register("user.birthdate",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              validate:verifyDate

            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" placeholder='111111' type="date" />
            {errors.user?.birthdate && (<p className='text-red-400 font-light'>{errors.user.birthdate.message}</p>)}
          </div>
        </div>

        <p className='w-full text-center text-4xl'>Direccion</p>

        <div className='bg-neutral-700 p-10 rounded space-y-5'>
          <div>
            <p>Calle</p>
            <input {...register("address.street",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" placeholder='Calle' type="text" />
            {errors.address?.street && (<p className='text-red-400 font-light'>{errors.address.street.message}</p>)}
          </div>

          <div>
            <p>Ciudad</p>
            <input {...register("address.city",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
                message: "❌Solo se permiten letras y espacios"
              }
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={20} placeholder='Ciudad' type="text" />
            {errors.address?.city && (<p className='text-red-400 font-light'>{errors.address.city.message}</p>)}
          </div>

          <div>
            <p>Estado</p>
            <input {...register("address.state",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
                message: "❌Solo se permiten letras y espacios"
              }
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={20} placeholder='Estado' type="text" />
            {errors.address?.state && (<p className='text-red-400 font-light'>{errors.address.state.message}</p>)}
          </div>

          <div>
            <p>Pais</p>
            <input {...register("address.country",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
                message: "❌Solo se permiten letras y espacios"
              }
              
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={20} placeholder='Pais' type="text" />
            {errors.address?.country && (<p className='text-red-400 font-light'>{errors.address.country.message}</p>)}
          </div>

          <div>
            <p>Codigo Postal</p>
            <input {...register("address.postal_code",{
              required:{
                value:true,
                message:"❌Este campo es obligatorio"
              },
              pattern: {
                value: /^[0-9]+$/,  // Solo números
                message: "❌Solo se permiten números"
              }
            })} className="w-full text-white p-2 bg-neutral-800 border-2 border-neutral-500 transition hover:border-neutral-300" maxLength={5} placeholder='111111' type="text" />
            {errors.address?.postal_code && (<p className='text-red-400 font-light'>{errors.address.postal_code.message}</p>)}
          </div>
        </div>
        

        <div className='space-y-2'>

          {
            userMutation.isSuccess &&(
              <p className='w-full text-green-500 font-medium text-xl text-center'>USUARIO REGISTRADO CON EXITO</p>
            )
          }
          <button type='submit' className='bg-neutral-500  outline-none w-full py-3 rounded hover:border-neutral-600 cursor-pointer transition hover:bg-neutral-600 flex justify-center items-center space-x-3'>
            {userMutation.isPending && (
              <div className='h-5 w-5 rounded-full border-2 border-r-transparent animate-spin'></div>
            )}
            <p className='text-2xl'>Registrarse</p>
          </button>
        </div>

        <div className="w-full flex items-center justify-center flex-col">
            <p className="text-white text-xl">¿Tienes una cuenta?</p>
            <NavLink to={"/login-user"} className={"text-neutral-200 underline"}>Inicia sesión aca</NavLink>
        </div>

      </form>
    </div>
  )


}

