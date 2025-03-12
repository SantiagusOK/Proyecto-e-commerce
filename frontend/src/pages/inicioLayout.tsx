import React from 'react'
import { InicioNavbar } from '../components/inicioNavbar'
import { Outlet } from 'react-router-dom'

export const InicioLayout = () => {
  return (
    <div>
        <InicioNavbar></InicioNavbar>
        <Outlet></Outlet>
    </div>
  )
}
