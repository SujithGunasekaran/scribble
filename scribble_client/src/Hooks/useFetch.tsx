import { useState } from 'react';
import axios from 'axios';

export const useFetch = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const postData = async (url: string, inputData: object | string, userToken: boolean) => {
        setLoading(true);
        const header: any = {
            headers: {
                "Content-Type": "application/json",
                "usertoken": userToken ? sessionStorage.getItem("userToken") : null
            }
        }
        try {
            const response = await axios.post(url, inputData, header);
            return response.data
        }
        catch (err) {
            throw new Error(err);
        }
        finally {
            setLoading(false)
        }
    }

    const getData = async (url: string, userToken: boolean) => {
        setLoading(true);
        const header: any = {
            headers: {
                "Content-Type": "application/json",
                "usertoken": userToken ? sessionStorage.getItem("userToken") : null
            }
        }
        try {
            const response = await axios.get(url, header);
            return response.data;
        }
        catch (err) {
            throw new Error(err);
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, apiError, postData, getData, setApiError }

}

