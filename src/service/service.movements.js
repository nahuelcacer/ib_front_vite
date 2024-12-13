import axios from "axios"

export const createMovement =  async (data) => {
    try {
        const response = axios.post(`${import.meta.env.VITE_API_URL}movement`, data)
    }
    catch(err){
        console.error(err)
    }
}