import React, { useContext, useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../components/Sidebar'
import { ArrowLeftRight, Home } from 'lucide-react'
import { ProfileContext } from '../context/ProfileContext'
import { Outlet } from 'react-router-dom'
import { getInstitutions } from '../service/service.instituions'
import { Card, CardHeader, Select, SelectItem } from '@nextui-org/react'


const MainLayout = () => {
  const { institution_id } = useContext(ProfileContext)

  const [institutions, setInstitutions] = useState(null)
  // const [selectedInstitution, setSelectedInstitution] = useState(null)
  useEffect(() => {
    const fetchInstitutions = async () => {
      const data = await getInstitutions()
      setInstitutions(data)
    }
    fetchInstitutions()
    //   const selectedInstitution = JSON.parse(sessionStorage.getItem('user')).institution_id
    //   setSelectedInstitution(institution?.find(inst => inst.id === parseInt(selectedInstitution)))
  }, [])
  return (
    <div className="flex">
      <div className="fixed top-4 right-4 z-50">
        <Card className='w-full max-w-xs bg-default-100' >
          <CardHeader className='flex gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>

            <p className='text-small text-default-500'>{institutions?.find(inst => inst.id === parseInt(institution_id)).nombre}</p>
          </CardHeader>
        </Card>
        {/* <Select placeholder='Selecciona una institución'>
          {institution?.map((inst) => (
            <SelectItem key={inst.id}>{inst.nombre}</SelectItem>
          ))}
        </Select> */}

      </div>
      <Sidebar>
        <SidebarItem to="/" icon={<Home size={20} />} text="Inicio" />
        <SidebarItem to="/movimientos" icon={<ArrowLeftRight size={20} />} text="Movimientos" />

      </Sidebar>
      <main className="flex-1 p-4 text-center align-middle">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 