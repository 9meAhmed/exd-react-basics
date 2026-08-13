
import { Outlet } from 'react-router';

function AuthLayout() {


    return <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
        <div className="card shadow-sm border-0 w-100" style={{ maxWidth: '420px' }}>
            <div className="card-body p-4">
                
                <Outlet />
            </div>
        </div>
    </div>


}

export default AuthLayout;