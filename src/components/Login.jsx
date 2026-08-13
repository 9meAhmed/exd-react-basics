function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <h2 className="h4 text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        required
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
