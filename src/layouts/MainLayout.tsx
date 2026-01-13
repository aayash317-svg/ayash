import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, GraduationCap } from 'lucide-react';

const MainLayout: React.FC = () => {
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const displayName = profile?.full_name || user?.email || 'User';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
            <header style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--gray-200)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
                    <div
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <div style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            backgroundColor: 'var(--primary-100)',
                            color: 'var(--primary-700)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <GraduationCap size={24} />
                        </div>
                        <span>University Portal</span>
                    </div>
                    {user && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '2rem',
                                    height: '2rem',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--primary-100)',
                                    color: 'var(--primary-700)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 600,
                                    fontSize: '0.875rem'
                                }}>
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)' }}>{displayName}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', gap: '0.5rem' }}
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>
            <main style={{ flex: 1, padding: '2rem 0' }}>
                <Outlet />
            </main>
            <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--gray-200)', padding: '2rem 0', marginTop: 'auto' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    <p>© 2026 University Portal. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--color-text-muted)' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'var(--color-text-muted)' }}>Terms of Service</a>
                        <a href="#" style={{ color: 'var(--color-text-muted)' }}>Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
