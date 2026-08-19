import { useState } from "react";

const BASE_URL = "http://localhost:3000";

const unAuthorizedEndpoints = [
    "/auth/login",
    "/auth/signup"
];

export function useApi(endpoint, method = "GET") {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const callEndPoint = async (body = null, headers = {}) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(unAuthorizedEndpoints.includes(endpoint) ? {} : { "Authorization": `Bearer ${localStorage.getItem('accessToken')}` }),
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            });

            if (!response.ok) {
                console.error(`API Error: ${response.status}`);

                if(response.status === 401) {

                    const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-refresh-token": `${localStorage.getItem('refreshToken')}`,
                        },
                        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
                    });

                    if (refreshResponse.ok) {
                        const refreshData = await refreshResponse.json();
                        localStorage.setItem('accessToken', refreshData.token);
                        localStorage.setItem('refreshToken', refreshData.refreshToken);
                        return callEndPoint(body, headers);
                    } else {
                        console.error('Refresh token failed:', refreshResponse.status);
                    }
                }

                throw new Error(`Server returned status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('API Response:', data);

            setResponse(data);
        } catch (err) {
            console.error('API Error:', err);
            setError(err);
        }
    };

    return { response, error, callEndPoint };
}