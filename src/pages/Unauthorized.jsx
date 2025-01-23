import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100" >
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">Sin autorizacion</h1>
                <h2 className="text-4xl font-semibold text-gray-600 mt-4">
                    ¡No esta autorizado para ver esta página!
                </h2>
                <p className="text-gray-500 mt-4 mb-8">
                    Lo sentimos, no tiense los permisos para acceder a la página que buscas.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Volver al inicio
                </button>
            </div>
        </div >
    )
}

export default Unauthorized