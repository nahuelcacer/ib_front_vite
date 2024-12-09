export const createBanco = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}bancos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
          'Authorization': `${sessionStorage.getItem('token')}`
       },
      body: JSON.stringify(data)
    })
    return response.json()
  }   

export const getBancos = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}bancos`)
    return response.json()
}   

