import axios from "axios"

export const registerPersonal = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}personal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const getPersonal = async (q, setter) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}personal`,
    {
      params: {
        institution_id: q
      }, 
      headers: {
        'Content-Type': 'application/json'
      }
    })
  const data = response.data
  setter(data)
  return data
}

export const getPersonalById = async (id, setter) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}personal/${id}`)
  const data = response.data
  setter(data)
  return data
} 


export const updatePersonal = async (id, data) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}personal/${id}`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const deletePersonal = async (id) => {
  try { 
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}personal/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
