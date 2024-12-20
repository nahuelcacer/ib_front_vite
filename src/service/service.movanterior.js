import axios from "axios"

export const getMovimientosAnteriores = async (data) => {
    try {
        console.log(data)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/mov-anteriores`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params:data
        })
        return response.data
    } catch (error) {
        console.error(error)
    }   
}   