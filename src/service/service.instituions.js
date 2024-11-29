export const getInstitutions = async () => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}institution/`)
        const data = await response.json()
        return data
    }catch(err){
        console.error(err)
    }
}