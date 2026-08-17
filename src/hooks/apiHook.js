import { useState } from "react";

const BASE_URL = "http://localhost:3000";

export function useApi(endpoint, method = "GET") {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const callEndPoint = async (body = null, headers = {}) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            });

            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }

            const data = await response.json();
            setResponse(data);
        } catch (err) {
            setError(err);
        }
    };

    return { response, error, callEndPoint };
}