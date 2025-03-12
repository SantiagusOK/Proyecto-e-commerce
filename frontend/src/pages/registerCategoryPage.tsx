import { useForm } from 'react-hook-form'
import { categoryRegisterData } from '../type/categoryRegister'
import { categoryRegister } from '../hooks/category_hooks'
export const RegisterCategoryPage = () => {

  const categoryMutation = categoryRegister()

  const {
      register,
      handleSubmit,
      formState: {errors}
    } =useForm<categoryRegisterData>()

  const registerNewCategory = (category:categoryRegisterData) => {
    categoryMutation.mutate(category)
  } 

  return (
      <div className="flex flex-col items-center justify-center space-y-10 py-10">
          <p className="text-white text-4xl font-mono">Registrar una categoria</p>
          <form className="bg-neutral-600 p-5 rounded w-[50%] space-y-5" onSubmit={handleSubmit(registerNewCategory)}>

              {/* NOMBRE Y CATEGORIA */}
              <div className="w-full flex space-x-5  items-start justify-center">
                  {/* NOMBRE */}
                  <div className="w-full">
                      <p className="text-white">Nombre</p>
                      <input {...register("name",{
                          required:{
                              value:true,
                              message:"❌Este campo es obligatorio"
                          }
                      })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300" type="text" pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+" />
                      {errors.name &&(<p className="text-red-300">{errors.name.message}</p>)}
                  </div>
              </div>

              {/* DESCRICION */}
              <div>
                  <p className="text-white">Descripcion</p>
                  <textarea {...register("description",{
                      required:{
                          value:true,
                          message:"❌Este campo es obligatorio"
                      }
                  })} className="bg-neutral-700 text-white p-2 w-full rounded border-2 border-neutral-500 transition hover:border-neutral-300 h-30" placeholder="..."></textarea>
                  {errors.description &&(<p className="text-red-300">{errors.description.message}</p>)}
              </div>

              {
                  categoryMutation.isSuccess&&(<p className="w-full text-center text-green-600 font-medium">Categoria registrado con exito</p>)
              }

              <button className="w-full bg-neutral-500 py-3 transition hover:bg-neutral-400 cursor-pointer flex items-center justify-center space-x-5" type="submit">
                  {categoryMutation.isPending&&(<div className="h-5 w-5 border-2 border-t-transparent border-l-transparent rounded-full border-white animate-spin"></div>)}
                  <p>Registrar categoria</p>
              </button>

          </form>
      </div>
  )
}
