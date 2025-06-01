import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'Student' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return setError("Passwords don't match");
        }
        const result = await authService.register(form);
        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message || 'Registration failed');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center py-5" style={{ minHeight: '100vh' }}>
            <div className="card shadow-sm border-0 p-3 w-100" style={{ maxWidth: '360px', borderRadius: '0.75rem' }}>
                <h4 className="mb-2 text-center text-primary fw-semibold">Create EduSync Account</h4>
                <p className="text-center text-muted mb-3 small">Join as a Student or Instructor</p>

                {error && <div className="alert alert-danger small py-2">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label small">Full Name</label>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" name="name" onChange={handleChange} required placeholder="John Doe" />
                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="form-label small">Email</label>
                        <div className="input-group input-group-sm">
                            <input type="email" className="form-control" name="email" onChange={handleChange} required placeholder="you@example.com" />
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="form-label small">Password</label>
                        <div className="input-group input-group-sm">
                            <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" onChange={handleChange} required placeholder="Create a password" />
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="mb-2">
                        <label className="form-label small">Confirm Password</label>
                        <div className="input-group input-group-sm">
                            <input type={showConfirmPassword ? 'text' : 'password'} className="form-control" name="confirmPassword" onChange={handleChange} required placeholder="Re-enter your password" />
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1">
                                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small">Role</label>
                        <div className="input-group input-group-sm">
                            <select className="form-select" name="role" onChange={handleChange}>
                                <option value="Student">Student</option>
                                <option value="Instructor">Instructor</option>
                            </select>
                            <span className="input-group-text"><i className="bi bi-person-badge"></i></span>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success btn-sm w-100">
                        <i className="bi bi-person-plus me-1"></i>Register
                    </button>
                </form>

                <p className="text-center mt-2 small">
                    Already have an account? <Link to="/login" className="text-decoration-none">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
