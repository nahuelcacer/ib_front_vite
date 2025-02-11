import authService from "./auth"

const getMovimientoDia = async (accounts) => {
    try {
        const userData = authService.getUser()
        const { client_id, token_ib, customer_id } = userData
        const bodyData = {
            token_ib: token_ib.access_token,
            client_id: client_id,
            customer_id: customer_id,
            account_type: accounts.account_type,
            accounts_number: accounts.account_number,
            bank_code: accounts.bank_number,
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}movdia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }   
}

export default getMovimientoDia
