import { data } from "autoprefixer"
import axios from "axios"

export const createMovement =  async (data) => {
    try {
        const response = axios.post(`${import.meta.env.VITE_API_URL}movement`, data)
    }
    catch(err){
        console.error(err)
    }
}

export const getMovementByDate = async (fecha,setter) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}movement?fecha=${fecha}`)
        const data = response.data
        setter(data)
        return data
    }catch(err){
        setter(null)
        console.error(err)
    }
}