import { createContext, useState, useContext, useEffect } from 'react';
import { useApi } from '../hooks/apiHook';
import { ENDPOINTS } from '../constants/endpoints';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const { response, error, callEndPoint } = useApi(ENDPOINTS.USER_INFO, 'GET');
    const [isLoading, setIsLoading] = useState(true);

    const user = response?.user ?? null;
    const isAuthenticated = !!user;

    useEffect(() => {
        const fetchUserData = async () => {
            await callEndPoint();
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}