import axios from "axios"; // Importar Axios

export const getSaldos = async (desde, hasta, setter) => {
  try {
    const userData = sessionStorage.getItem("user");
    const { token_ib, client_id, customer_id, accounts } = JSON.parse(userData);

    const accounts_number = accounts.map((acc) => acc.account_number);
    const bank_code = accounts.map((acc) => acc.bank_number);
    const account_type = accounts.map((acc) => acc.account_type);
    console.log(accounts_number, bank_code, account_type)

    const response = await axios.get(`${import.meta.env.VITE_API_URL}saldos/`, {
      params: {
        accounts_number, // Convertir el array a JSON
        bank_code, // Convertir el array a JSON
        account_type, // Convertir el array a JSON
        desde,
        hasta,

      }, // Pasar los parámetros directamente
      headers: {
        "Content-Type": "application/json",
        token_ib: token_ib.access_token,
        client_id: client_id,
        customer_id: customer_id,
      },
    });
    const data = response.data
    setter(data)
    return data
  } catch (err) {
    console.error(err);
  }
};
