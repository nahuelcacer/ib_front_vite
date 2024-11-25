import React from 'react'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import login from '../../service/service.login'

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const data = await login(formData.username, formData.password)
            console.log('Datos de login:', data)
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-center">Iniciar Sesión</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-800">Usuario</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-800">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Iniciar Sesión
                </button>
            </div>

            <p className="text-center text-sm">
                ¿No tienes cuenta?{' '}
                <Link to="/auth/register" className="text-gray-800 hover:text-gray-600">
                    Regístrate
                </Link>
            </p>
        </div>
    )
}

export default Login