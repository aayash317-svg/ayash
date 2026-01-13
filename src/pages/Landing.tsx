import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1rem' }}>University Portal</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Select your role to continue</p>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <div className="card" style={{ width: '300px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/login/student')}>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Student</h2>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Access degree audit, schedule, and progress tracking.</p>
                    <button className="btn btn-primary" style={{ width: '100%' }}>Student Login</button>
                </div>

                <div className="card" style={{ width: '300px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/login/staff')}>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Staff</h2>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>Manage courses, data entry, and compliance.</p>
                    <button className="btn btn-outline" style={{ width: '100%' }}>Staff Login</button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
