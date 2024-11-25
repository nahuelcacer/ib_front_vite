import React from 'react'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ children }) => {
  const { username, role} = JSON.parse(sessionStorage.getItem('user'))
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
}

export default MainLayout 