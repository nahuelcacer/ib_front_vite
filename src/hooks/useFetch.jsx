import { useState, useEffect } from "react";

const useFetch = async (url, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json()
                setData(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url, options])
    return { data, loading, error }
}

export default useFetch