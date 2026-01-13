import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const MainLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header style={{ backgroundColor: 'var(--color-white)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                        University Portal
                    </div>
                    {user && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline"
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', gap: '0.25rem' }}
                            >
                                <LogOut size={14} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>
            <main style={{ flex: 1, backgroundColor: 'var(--color-secondary)' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
