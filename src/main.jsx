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

const App = () => {
  const token = sessionStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="register" element={!token ? <Register /> : <Navigate to="/" />} />
        </Route>

        <Route path="/" element={token ? <ProfileProvider><MainLayout /></ProfileProvider> : <Navigate to="/auth/login" />} >
          <Route path="/" element={<Home />} />
          <Route path="/movimientos" element={<Movimientos />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <main >
        <App />
      </main>
    </NextUIProvider>
  </StrictMode>
)
