import axios from "axios"

export const registerReceipt = async (data) => {
  try {
    const response = axios.post(`${import.meta.env.VITE_API_URL}receipt`, data)
    return response.json()
  } catch (error) {
    console.error(error)
  }
}       
