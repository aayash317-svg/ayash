import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StaffLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setStep('otp');
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === '1234') { // Mock OTP
            login('staff', email);
            navigate('/staff/dashboard');
        } else {
            alert('Invalid OTP (use 1234)');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div className="card" style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary)' }}>Staff Login</h2>

                {step === 'email' ? (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)' }}>Staff Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="staff@university.edu"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Request OTP</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>OTP sent to {email}</p>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)' }}>Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="1234"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Verify & Login</button>
                        <button type="button" className="btn btn-outline" onClick={() => setStep('email')}>Back</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default StaffLogin;
