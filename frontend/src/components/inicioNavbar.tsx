import { NavLink } from 'react-router-dom'
import logov2 from "../assets/img/logov3.png"

export const InicioNavbar = () => {
  return (
    <div className='w-full bg-neutral-700 p-5 space-x-3 flex items-center justify-around h-fit'>
      
      <NavLink className='text-white ' to={'/'}>
          <img className='h-5' src={logov2} alt="" />
      </NavLink>
      <div className='space-x-5'>
          <NavLink to={"/login-user"} className={"text-white font-medium"}>Iniciar sessión</NavLink>
          <NavLink to={"/register-user"} className={"text-white font-medium"}>Registrarse</NavLink>
      </div>

      
    </div>
  )
}
