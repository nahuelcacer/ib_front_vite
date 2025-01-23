import { Link, Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                {/* El logo o título de tu aplicación */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        GESTIB
                    </h2>

                </div>
                {/* Outlet renderizará el contenido de las rutas hijas (Login o Register) */}
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout