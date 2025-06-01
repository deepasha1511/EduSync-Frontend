import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

function Navbar() {
    const { isDarkMode, toggleTheme } = useTheme();
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const [showRole, setShowRole] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const navbarStyle = {
        backgroundColor: isDarkMode ? '#3a3a3c' : '#f5f5f5',
        color: isDarkMode ? '#f1f1f1' : '#1f1f1f',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Segoe UI, sans-serif',
        boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.6)' : '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        fontWeight: 500,
        fontSize: '1rem',
    };

    const iconStyle = {
        background: 'none',
        border: 'none',
        color: isDarkMode ? '#f5f5f5' : '#333',
        fontSize: '1.25rem',
        cursor: 'pointer',
        marginLeft: '1rem'
    };

    return (
        <nav style={navbarStyle}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', fontSize: '1.5rem' }}>
                🎓 EduSync
            </Link>

            <div style={navLinksStyle}>
                {role === 'Instructor' && (
                    <>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/instructor/dashboard">Dashboard</Link>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/instructor/courses">Courses</Link>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/instructor/assessments">Assessments</Link>
                    </>
                )}
                {role === 'Student' && (
                    <>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/student/dashboard">Dashboard</Link>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/student/courses">Courses</Link>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/student/results">Results</Link>
                    </>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => setShowRole(prev => !prev)} style={iconStyle} title="Show Role">
                    <i className="bi bi-person-circle"></i>
                </button>

                {showRole && (
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                        {role}
                    </span>
                )}

                <button onClick={toggleTheme} style={iconStyle} title="Toggle Theme">
                    <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
                </button>


                <button
                    onClick={logout}
                    title="Logout"
                    style={{ ...iconStyle, marginLeft: '0.75rem' }}
                >
                    <i className="bi bi-box-arrow-right"></i>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;