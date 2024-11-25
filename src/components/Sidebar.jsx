import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { username, role } = JSON.parse(sessionStorage.getItem('user'))


  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-sm font-bold'>{username.toUpperCase()}</h1>
          <p className='text-sm'>{role}</p>
        </div>
        <button className='bg-red-500 text-white px-2 py-1 rounded'>Cerrar sesión</button>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
              {/* Dashboard */}
            </Link>
          </li>
          {/* Agregar más enlaces según necesites */}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar 