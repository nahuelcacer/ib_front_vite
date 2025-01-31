import axios from "axios"

export const getMovimientosAnteriores = async (data) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}mov-anteriores?${data}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            // params:data
        })
        return response.data
    } catch (error) {
        console.error(error)
    }   
}   