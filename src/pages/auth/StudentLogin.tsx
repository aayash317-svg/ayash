import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

const StudentLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [loading, setLoading] = useState(false);
    const { sendOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await sendOtp(email);
        setLoading(false);
        if (error) {
            alert(error.message);
        } else {
            setStep('otp');
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await verifyOtp(email, otp);
        setLoading(false);
        if (error) {
            alert('Invalid OTP or error verifying: ' + error.message);
        } else {
            navigate('/student/dashboard');
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
                    <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>Student Portal</h2>
                    <p className="text-muted">Sign in to access your academic dashboard</p>
                </div>

                {step === 'email' ? (
                    <form onSubmit={handleSendOtp}>
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
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            {loading ? 'Sending...' : <>Send Secure Code <ArrowRight size={18} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div style={{
                            backgroundColor: 'var(--primary-50)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem',
                            fontSize: '0.875rem',
                            color: 'var(--primary-800)',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center'
                        }}>
                            <ShieldCheck size={16} />
                            Code sent to <span style={{ fontWeight: 600 }}>{email}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Verification Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="1234"
                                className="form-input"
                                style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem' }}
                                maxLength={4}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                        <button type="button" className="btn btn-outline" onClick={() => setStep('email')} style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            Go Back
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default StudentLogin;
