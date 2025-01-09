export const registerReceipt = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/receipt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (error) {
    console.error(error)
  }
}       
