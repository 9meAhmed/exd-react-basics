import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApi } from '../hooks/apiHook';

const loginSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
});


function Login() {
    
        const loginApi = useApi('/auth/login', 'POST');
    
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: zodResolver(loginSchema),
        });
    
        const onSubmit = async (data) => {
            console.log('Valid login data:', data);
    
            await loginApi.callEndPoint(data);
    
            if (loginApi.error) {
                console.error('Submission Error:', loginApi.error);
            } else {
                console.log('Success:', loginApi.response);
            }
        };

    return (
        <>
            <h2 className="h4 text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        required
                        {...register('email')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        {...register('password')}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Sign in
                </button>
            </form>
        </>
    );
}

export default Login;
