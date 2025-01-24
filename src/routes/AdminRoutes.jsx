import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movimientos from '../pages/Movimientos'
import ProfileProvider from '../context/ProfileContext'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Administracion from '../pages/administracion/Administracion'
import EditarPersonal from '../pages/administracion/EditarPersonal'
import MainLayout from '../layouts/MainLayout'

const AdminRoutes = ({children}) => {
    return (
        <Routes>
            {children}
            <Route path="/" element={<ProfileProvider><MainLayout /></ProfileProvider>} >
                <Route index element={<Home />} />
                <Route path="/administracion" element={<Administracion />} />
                <Route path="/movimientos" element={<Movimientos />} />

                {/* <Route path="/personal/crear" element={<CrearPersonal />} /> */}
                <Route path="/personal/:id" element={<EditarPersonal />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default AdminRoutes