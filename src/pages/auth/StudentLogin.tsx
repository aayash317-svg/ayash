import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, GraduationCap, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const { loginWithPassword, signUp } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isSignUp) {
            // Sign Up Flow
            const { data, error } = await signUp(email, password);
            if (error) {
                alert(error.message);
                setLoading(false);
            } else if (data.session?.user) {
                // Auto-create profile if trigger is missing
                const user = data.session.user;
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: user.id,
                            email: email,
                            full_name: fullName,
                            role: 'student'
                        }
                    ]);

                setLoading(false);
                if (profileError) {
                    // If duplicate key, it might mean trigger worked or previous attempt worked.
                    // We ignore 'duplicate key' usually, but let's alert if other error.
                    if (!profileError.message.includes('duplicate key')) {
                        alert('Account created but profile setup failed: ' + profileError.message);
                    } else {
                        navigate('/student/dashboard');
                    }
                } else {
                    navigate('/student/dashboard');
                }
            } else {
                setLoading(false);
                alert('Sign up successful! Please check your email to confirm if required, then sign in.');
                setIsSignUp(false); // Switch back to login
            }
        } else {
            // Login Flow

            // 1. Check if email exists first (to give specific error)
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

            // 2. Attempt Password Login
            const { error } = await loginWithPassword(email, password);
            setLoading(false);
            if (error) {
                if (error.message.includes('Database error saving new user')) {
                    alert('Database Error setup issue.');
                } else if (error.message.includes('Invalid login credentials')) {
                    alert('Password is not correct');
                } else {
                    alert('Password is not correct'); // Default to password error if email existed
                }
            } else {
                navigate('/student/dashboard');
            }
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        backgroundColor: 'var(--primary-100)',
                        color: 'var(--primary-700)',
                        borderRadius: 'var(--radius-full)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <GraduationCap size={28} />
                    </div>
                    <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>Student {isSignUp ? 'Registration' : 'Portal'}</h2>
                    <p className="text-muted">{isSignUp ? 'Create your student account' : 'Sign in with your email and password'}</p>
                </div>

                <form onSubmit={handleLogin}>
                    {isSignUp && (
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                    className="form-input"
                                    style={{ paddingLeft: '2.75rem' }}
                                    required={isSignUp}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Institutional Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="student@university.edu"
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

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                        {loading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : <>{isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight size={18} /></>}
                    </button>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary-600)',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: '0.875rem'
                            }}
                        >
                            {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default StudentLogin;
