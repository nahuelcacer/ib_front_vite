import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { NextUIProvider } from '@nextui-org/react'
import store from './store/store'
import { Provider, useSelector } from 'react-redux'
import authService from './service/auth'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'

const App = () => {
  const token = authService.getToken()

  const checkRoleUser = () => {
    const role = token ? authService.getUser().role : null
    const userRole = role === "user"
    return userRole
  }
  // console.log(asda,  'USER APP')

  const isAdminUser = checkRoleUser()
  return (
    <BrowserRouter>
      {isAdminUser ?
        <AdminRoutes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="register" element={!token ? <Register /> : <Navigate to="/" />} />
          </Route>
        </AdminRoutes>
        :
        <UserRoutes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="register" element={!token ? <Register /> : <Navigate to="/" />} />
          </Route>
        </UserRoutes>}


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
