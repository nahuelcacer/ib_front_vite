import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movimientos from '../pages/Movimientos'
import ProfileProvider from '../context/ProfileContext'
import UserLayout from '../layouts/UserLayout'
import ErrorPage from '../pages/ErrorPage'

const UserRoutes = ({children}) => {

    return (
        <Routes>
            {children}
            <Route path='/' element={
                <ProfileProvider>
                    <UserLayout />
                </ProfileProvider>
            }>
                <Route index element={<Movimientos />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
}

export default UserRoutes