import React, { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../components/Sidebar'
import { ArrowLeftRight, Home } from 'lucide-react'
import ProfileProvider from '../context/ProfileContext'
import { Outlet } from 'react-router-dom'
import { getInstitutions } from '../service/service.instituions'
import { Select, SelectItem } from '@nextui-org/react'


const MainLayout = () => {
  const [institution, setInstitution] = useState(null)
  const [selectedInstitution, setSelectedInstitution] = useState(null)
  useEffect(() => {
    const fetchInstitutions = async () => {
      const data = await getInstitutions()
      setInstitution(data)
    }
    fetchInstitutions()
    const selectedInstitution = JSON.parse(sessionStorage.getItem('user')).institution_id
    setSelectedInstitution(institution?.find(inst => inst.id === parseInt(selectedInstitution)) )
  }, [selectedInstitution])
  return (
    <div className="flex">
      <ProfileProvider>
        <div className="fixed top-4 right-4 z-50">
          <Select>
            {institution?.map((inst) => (
              <SelectItem key={inst.id}>{inst.nombre}</SelectItem>
            ))}
          </Select>
          
        </div>
        <Sidebar>
          <SidebarItem to="/" icon={<Home size={20} />} text="Inicio" />
            <SidebarItem to="/movimientos" icon={<ArrowLeftRight size={20} />} text="Movimientos" />

        </Sidebar>
        <main className="flex-1 p-4 text-center align-middle">
          <Outlet />
        </main>
      </ProfileProvider>
    </div>
  )
}

export default MainLayout 