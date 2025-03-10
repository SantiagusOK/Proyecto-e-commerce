import { useForm,  } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../api/userApi'
import { NavLink } from 'react-router-dom'
import { userRegisterMutation } from '../api/userRegisterMutation'

export const UserCreatePage = () =>{

  const userMutation = userRegisterMutation()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } =useForm()

  const registerNewUser = async (userData:any)  => {
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

  return(
    <div className='flex justify-center py-20'>
      <form className='bg-white w-230 p-10 space-y-5 rounded-2xl shadow' onSubmit={handleSubmit(registerNewUser)}>

        <p className='w-full text-center text-4xl'>Registrase</p>

        <hr />

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
          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={15} placeholder='Nombre' type="text" />
          {errors.fullname && (<p className='text-red-500 font-black'>{String(errors.fullname.message)}</p>)}
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
          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={15} placeholder='Apellido' type="text" />
          {errors.lastname && (<p className='text-red-500 font-black'>{String(errors.lastname.message)}</p>)}
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
          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={12} placeholder='Nombre de Usuario' type="text" />
          {errors.username && (<p className='text-red-500 font-black'>{String(errors.username.message)}</p>)}
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
          })} className='w-full bg-neutral-500 text-white p-2 rounded' placeholder='Correo@electronico.com' type="email" />
          {errors.email && (<p className='text-red-500 font-black'>{String(errors.email.message)}</p>)}
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
            

          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={20} placeholder='111111' type="password" />
          {errors.password && (<p className='text-red-500 font-black'>{String(errors.password.message)}</p>)}
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

          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={20} placeholder='111111' type="password" />
          {errors.passwordSecond && (<p className='text-red-500 font-black'>{String(errors.passwordSecond.message)}</p>)}
        </div>

        <div>
          <p>Fecha de nacimiento</p>
          <input {...register("user.birthdate",{
            required:{
              value:true,
              message:"❌Este campo es obligatorio"
            },
            validate:verifyDate

          })} className='w-full bg-neutral-500 text-white p-2 rounded' placeholder='111111' type="date" />
          {errors.birthdate && (<p className='text-red-500 font-black'>{String(errors.birthdate.message)}</p>)}
        </div>




        
        <p className='w-full text-center text-4xl'>Direccion</p>

        <hr />

        <div>
          <p>Calle</p>
          <input {...register("address.street",{
            required:{
              value:true,
              message:"❌Este campo es obligatorio"
            },
          })} className='w-full bg-neutral-500 text-white p-2 rounded' placeholder='Calle' type="text" />
          {errors.street && (<p className='text-red-500 font-black'>{String(errors.street.message)}</p>)}
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
          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={20} placeholder='Ciudad' type="text" />
          {errors.city && (<p className='text-red-500 font-black'>{String(errors.city.message)}</p>)}
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
          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={20} placeholder='Estado' type="text" />
          {errors.state && (<p className='text-red-500 font-black'>{String(errors.state.message)}</p>)}
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
            
          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={20} placeholder='Pais' type="text" />
          {errors.country && (<p className='text-red-500 font-black'>{String(errors.country.message)}</p>)}
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
          })} className='w-full bg-neutral-500 text-white p-2 rounded' maxLength={5} placeholder='111111' type="text" />
          {errors.postal_code && (<p className='text-red-500 font-black'>{String(errors.postal_code.message)}</p>)}
        </div>


        <hr />
        
        {
          userMutation.isSuccess &&(
            <p className='w-full text-green-500 font-black text-2xl text-center'>USUARIO REGISTRADO CON EXITO</p>
          )
        }

        {/* {
          userMutation.isError &&(
            <p className='w-full text-red-500 font-black text-2xl text-center'>{userMutation.con}</p>
          )
        } */}

        <button type='submit' className='bg-blue-600 text-white w-full py-3 rounded cursor-pointer transition hover:bg-blue-800 flex justify-center items-center space-x-3'>
          {userMutation.isPending && (
            <div className='h-5 w-5 rounded-full border-2 border-r-transparent animate-spin'></div>
          )}
          <p className='text-2xl font-bold'>Registrarse</p>
        </button>

        <NavLink to={'/'} className={'bg-blue-600 text-white w-full py-3 rounded cursor-pointer transition hover:bg-blue-800 flex justify-center items-center'}>
          
          <p className='text-2xl font-bold'>Volver</p>
        </NavLink> 



      </form>
    </div>
  )


}

