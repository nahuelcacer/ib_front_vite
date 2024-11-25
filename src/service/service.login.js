import { jwtDecode } from "jwt-decode";

const login = async (username, password) => {
    try {
        const response = await fetch('/api/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, password, institution:1 })
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json()
        const decodedToken = jwtDecode(data.token)
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', JSON.stringify(decodedToken))
        window.location.href = '/'
        return data
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error;
    }
}

export default login

