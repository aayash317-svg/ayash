import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '4rem 0',
                background: 'linear-gradient(to bottom, var(--primary-50), transparent)',
                borderRadius: '0 0 var(--radius-2xl) var(--radius-2xl)'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--primary-100)',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--primary-700)',
                        fontWeight: 500
                    }}>
                        <span style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            backgroundColor: 'var(--color-success)',
                            borderRadius: '50%'
                        }} />
                        New Academic Year 2026 Live
                    </div>
                    <h1 className="text-h1" style={{ marginBottom: '1.5rem', fontSize: '3.5rem', lineHeight: 1.1 }}>
                        Shape Your Future with <br />
                        <span style={{
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--accent-indigo) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Academic Excellence</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                        The next-generation portal for students and staff. Manage your degree audit, optimize schedules, and track progress seamlessly.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/login/student')}
                            style={{ borderRadius: 'var(--radius-full)' }}
                        >
                            Student Portal <ArrowRight size={20} />
                        </button>
                        <button
                            className="btn btn-outline btn-lg"
                            onClick={() => navigate('/login/staff')}
                            style={{ borderRadius: 'var(--radius-full)' }}
                        >
                            Staff Access
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '2rem 0' }}>
                    <div className="card" style={{ borderTop: '4px solid var(--accent-indigo)' }}>
                        <div style={{
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: 'var(--primary-50)',
                            color: 'var(--accent-indigo)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-h3" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Degree Audit</h3>
                        <p className="text-muted">Track your academic progress with real-time degree audits and requirements checking.</p>
                    </div>
                    <div className="card" style={{ borderTop: '4px solid var(--accent-teal)' }}>
                        <div style={{
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: 'var(--gray-50)',
                            color: 'var(--accent-teal)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <Calendar size={24} />
                        </div>
                        <h3 className="text-h3" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Schedule Optimization</h3>
                        <p className="text-muted">AI-powered scheduling to build the perfect timetable around your preferences.</p>
                    </div>
                    <div className="card" style={{ borderTop: '4px solid var(--accent-rose)' }}>
                        <div style={{
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: 'var(--gray-50)',
                            color: 'var(--accent-rose)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-h3" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Secure & Private</h3>
                        <p className="text-muted">Enterprise-grade security ensuring your academic records and personal data are protected.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
