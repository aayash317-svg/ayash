import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { BookOpen, Calendar, MessageSquare } from 'lucide-react'; // Assuming lucide-react is installed

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-primary)' }}>Dashboard</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, {user?.name}</p>
                </div>
                <div>
                    <Badge status="success">Compliance: Verified</Badge>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card style={{ cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-card">
                    <div onClick={() => navigate('/student/audit')} style={{ textAlign: 'center', padding: '1rem' }}>
                        <BookOpen size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Degree Audit</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Check course progress and compliance.</p>
                    </div>
                </Card>
                <Card style={{ cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-card">
                    <div onClick={() => navigate('/student/schedule')} style={{ textAlign: 'center', padding: '1rem' }}>
                        <Calendar size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Schedule Optimizer</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Plan your next semester inputs.</p>
                    </div>
                </Card>
                <Card style={{ cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-card">
                    <div onClick={() => navigate('/student/chat')} style={{ textAlign: 'center', padding: '1rem' }}>
                        <MessageSquare size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Student Support</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Ask questions about your degree.</p>
                    </div>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <Card title="Degree Progress">
                    <div style={{ height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <div style={{ width: '65%', height: '100%', backgroundColor: 'var(--color-success)' }}></div>
                    </div>
                    <p style={{ textAlign: 'right', fontSize: '0.875rem' }}>65% Completed</p>
                </Card>
                <Card title="Current Load">
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>16</h2>
                        <p>Credits this Semester</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
