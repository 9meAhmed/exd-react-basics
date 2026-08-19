
import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function ProtectedLayout() {
    const {user} = useAuth();
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedLayout;