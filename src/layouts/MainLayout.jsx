import React, { useContext, useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../components/Sidebar'
import { ArrowLeftRight, Briefcase, ContactRound, Home, Settings } from 'lucide-react'
import { ProfileContext } from '../context/ProfileContext'
import { Outlet } from 'react-router-dom'
import { getInstitutions } from '../service/service.instituions'
import { Card, CardHeader, Select, SelectItem } from '@nextui-org/react'
import authService from '../service/auth'


const MainLayout = () => {
  const user = authService.getUser()
   console.log(user, "ESTE ES EL YUSER DE MAIN")
  return (
    <div className="flex" aria-label="Layout principal">
      <div className="fixed top-4 right-4 z-50" aria-label="Institucion">
        <Card className='w-full max-w-xs bg-default-100' >
          <CardHeader className='flex gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>

            <p className='text-small text-default-500' aria-label="Nombre de la institucion">{user?.institution_data.nombre || "INS"}</p>
          </CardHeader>
        </Card>
      </div>
      <Sidebar>
        <SidebarItem to="/" icon={<Home size={20} />} text="Inicio" />
        <SidebarItem to="/administracion" icon={<Settings size={20} />} text="Administracion" />
        <SidebarItem to="/movimientos" icon={<ArrowLeftRight size={20} />} text="Movimientos" />
        <SidebarItem to="/sueldos" icon={<Briefcase size={20} />} text="Sueldos" />
        <SidebarItem to="/sueldos" icon={<Briefcase size={20} />} text="Sueldos" />

      </Sidebar>
      <main className="flex-1 p-4 text-center align-middle" aria-label="Contenido principal">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 