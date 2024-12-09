export const registerPersonal = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}personal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
          'Authorization': `${sessionStorage.getItem('token')}`
       },
      body: JSON.stringify(data)
    })
    return response.json()
  }   