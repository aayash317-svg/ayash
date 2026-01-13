import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import { FileText, Upload, AlertCircle } from 'lucide-react';

const StaffDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-primary)' }}>Staff Dashboard</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Welcome, {user?.name}</p>
                </div>
                <div>
                    <span style={{ marginRight: '1rem' }}>Current Term: Fall 2024</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <Card style={{ cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-card">
                    <div onClick={() => navigate('/staff/data-entry')} style={{ textAlign: 'center', padding: '1rem' }}>
                        <Upload size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Data Entry</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Upload or enter student records.</p>
                    </div>
                </Card>
                <Card style={{ cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-card">
                    <div onClick={() => navigate('/staff/review')} style={{ textAlign: 'center', padding: '1rem' }}>
                        <AlertCircle size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Submission Review</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Review pending data validations.</p>
                    </div>
                </Card>
                <Card style={{ cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-card">
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <FileText size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                        <h3>Reports</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Generate compliance reports.</p>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Assigned Courses & Events</h2>
                <Card>
                    <Table headers={['Course', 'Event', 'Due Date', 'Status', 'Submissions']}>
                        <tr>
                            <td style={{ padding: '0.75rem' }}>CS101</td>
                            <td style={{ padding: '0.75rem' }}>Mid-Term Grading</td>
                            <td style={{ padding: '0.75rem' }}>Oct 15, 2024</td>
                            <td style={{ padding: '0.75rem' }}><Badge status="warning">Pending</Badge></td>
                            <td style={{ padding: '0.75rem' }}>0 / 120</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem' }}>CS102</td>
                            <td style={{ padding: '0.75rem' }}>Project Submission</td>
                            <td style={{ padding: '0.75rem' }}>Nov 20, 2024</td>
                            <td style={{ padding: '0.75rem' }}><Badge status="info">Upcoming</Badge></td>
                            <td style={{ padding: '0.75rem' }}>-</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem' }}>CS101</td>
                            <td style={{ padding: '0.75rem' }}>Assignment 1</td>
                            <td style={{ padding: '0.75rem' }}>Sept 30, 2024</td>
                            <td style={{ padding: '0.75rem' }}><Badge status="success">Completed</Badge></td>
                            <td style={{ padding: '0.75rem' }}>118 / 120</td>
                        </tr>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default StaffDashboard;
