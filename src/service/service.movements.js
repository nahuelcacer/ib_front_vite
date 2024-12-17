import { data } from "autoprefixer"
import axios from "axios"

export const createMovement =  async (data) => {
    const {movement_type, description, amount,bank_id} = data
    const movement = {  
        ...data,
        amount: movement_type === "Ingreso" ? Number(amount) : -Number(amount),
    }
    try {
        const response = axios.post(`${import.meta.env.VITE_API_URL}movement`, movement)
    }
    catch(err){
        console.error(err)
    }
}

export const getMovementByDate = async (fecha,institution_id, setter) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}movement?fecha_movimiento=${fecha}&institution_id=${institution_id}`)
        const data = response.data
        setter(data)
        return data
    }catch(err){
        setter(null)
        console.error(err)
    }
}