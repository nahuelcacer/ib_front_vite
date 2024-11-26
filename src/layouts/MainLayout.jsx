import React from 'react'
import Sidebar, { SidebarItem } from '../components/Sidebar'
import { ArrowLeftRight, Home } from 'lucide-react'
import ProfileProvider from '../context/ProfileContext'


const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <ProfileProvider>
        <Sidebar>
          <SidebarItem to="/" icon={<Home size={20} />} text="Inicio" />
          <SidebarItem to="/diario" icon={<ArrowLeftRight size={20} />} text="Diario" />
          <SidebarItem to="/anteriores" icon={<ArrowLeftRight size={20} />} text="Anteriores" />

        </Sidebar>
        <main className="flex-1 p-4">
          {children}
        </main>
      </ProfileProvider>
    </div>
  )
}

export default MainLayout 