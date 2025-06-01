import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await authService.login(email, password);
        if (result.success) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('role', result.role);
            if (result.role === 'Instructor') navigate('/instructor/dashboard');
            else if (result.role === 'Student') navigate('/student/dashboard');
            else navigate('/login');
        } else {
            setError(result.message || 'Login failed');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center py-5" style={{ minHeight: '100vh' }}>
            <div className="card shadow-sm border-0 p-3 w-100" style={{ maxWidth: '360px', borderRadius: '0.75rem' }}>
                <h4 className="mb-2 text-center text-primary fw-semibold">Login to EduSync</h4>
                <p className="text-center text-muted mb-3 small">Enter your credentials to continue</p>

                {error && <div className="alert alert-danger small py-2">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label small">Email address</label>
                        <div className="input-group input-group-sm">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small">Password</label>
                        <div className="input-group input-group-sm">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                                title={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success btn-sm w-100">
                        <i className="bi bi-box-arrow-in-right me-1"></i>Login
                    </button>
                </form>

                <p className="text-center mt-2 small">
                    Don’t have an account? <Link to="/register" className="text-decoration-none">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
