import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const StaffLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginWithPassword } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // 1. Check if email exists first
        const { data: profileData } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .single();

        if (!profileData) {
            setLoading(false);
            alert('Email is not correct');
            return;
        }

        const { error } = await loginWithPassword(email, password);
        setLoading(false);
        if (error) {
            if (error.message.includes('Invalid login credentials')) {
                alert('Password is not correct');
            } else {
                alert('Password is not correct');
            }
        } else {
            navigate('/staff/dashboard');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', borderTop: '4px solid var(--accent-indigo)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        backgroundColor: 'var(--gray-100)',
                        color: 'var(--accent-indigo)',
                        borderRadius: 'var(--radius-full)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <Briefcase size={28} />
                    </div>
                    <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>Staff Access</h2>
                    <p className="text-muted">Secure login for faculty and administration</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Staff Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="staff@university.edu"
                                className="form-input"
                                style={{ paddingLeft: '2.75rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <ShieldCheck size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="form-input"
                                style={{ paddingLeft: '2.75rem' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--gray-900)' }} disabled={loading}>
                        {loading ? 'Authenticating...' : <>Access Portal <ArrowRight size={18} /></>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StaffLogin;
