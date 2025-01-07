import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ErrorPage from './pages/ErrorPage'
import MainLayout from './layouts/MainLayout'
import { NextUIProvider } from '@nextui-org/react'
import Movimientos from './pages/Movimientos'
import ProfileProvider from './context/ProfileContext'
import CrearPersonal from './pages/sueldos/CrearPersonal'
import Administracion from './pages/administracion/Administracion'
import EditarPersonal from './pages/administracion/EditarPersonal'
import store from './store/store'
import { Provider, useSelector } from 'react-redux'
import authService from './service/auth'

const App = () => {
  const token = authService.getToken()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="register" element={!token ? <Register /> : <Navigate to="/" />} />
        </Route>

        <Route path="/" element={token ? <ProfileProvider><MainLayout /></ProfileProvider> : <Navigate to="/auth/login" />} >
          <Route path="/" element={<Home />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/movimientos" element={<Movimientos />} />
          {/* <Route path="/sueldos" element={<Sueldos/>} /> */}
          <Route path="/personal/crear" element={<CrearPersonal/>} />
          <Route path="/personal/:id" element={<EditarPersonal/>} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <main >
          <App />
        </main>
      </Provider>
    </NextUIProvider>
  </StrictMode>
)
