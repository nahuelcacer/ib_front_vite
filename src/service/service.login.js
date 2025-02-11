import { jwtDecode } from "jwt-decode";
import authService from "./auth";

const login = async (username, password, institution) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}login/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, password, institution })
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        // const decodedToken = jwtDecode(data.token)
        authService.setToken(data.token)
        return data
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error;
    }
}

export default login

