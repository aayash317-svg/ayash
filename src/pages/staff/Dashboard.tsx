import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import { FileText, Upload, AlertCircle, Calendar, ArrowRight } from 'lucide-react';

const StaffDashboard: React.FC = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchTasks = async () => {
            try {
                const { data, error } = await supabase
                    .from('staff_tasks')
                    .select('*')
                    .eq('staff_id', user.id)
                    .order('due_date', { ascending: true });

                if (error) console.error('Error fetching tasks:', error);
                if (data) setTasks(data);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [user]);

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '1280px' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h1 className="text-h1" style={{ marginBottom: '0.5rem' }}>Staff Dashboard</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Welcome, <span style={{ color: 'var(--gray-900)', fontWeight: 600 }}>{profile?.full_name || user?.email}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                        padding: '0.75rem 1.25rem',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                    }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Current Term</span>
                        <span style={{ fontWeight: 600 }}>Fall 2026</span>
                    </div>
                </div>
            </div>

            {/* Quick Access Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <Card className="hover-card" onClick={() => navigate('/staff/data-entry')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-lg)', color: 'var(--color-primary)' }}>
                            <Upload size={28} />
                        </div>
                        <div style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--gray-100)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                            Action Required
                        </div>
                    </div>
                    <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Data Management</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Upload bulk student records or manually enter grades and attendance.</p>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Manage Data <ArrowRight size={16} />
                    </span>
                </Card>

                <Card className="hover-card" onClick={() => navigate('/staff/review')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', color: 'var(--accent-amber)' }}>
                            <AlertCircle size={28} />
                        </div>
                        <Badge status="warning">3 Pending</Badge>
                    </div>
                    <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Submission Review</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Review pending data validations and resolve flagged inconsistencies.</p>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Review Items <ArrowRight size={16} />
                    </span>
                </Card>

                <Card className="hover-card" style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', color: 'var(--accent-teal)' }}>
                            <FileText size={28} />
                        </div>
                    </div>
                    <h3 className="text-h3" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Compliance Reports</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Generate and export official compliance and enrollment reports.</p>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        View Reports <ArrowRight size={16} />
                    </span>
                </Card>
            </div>

            {/* Main Content Area */}
            <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 className="text-h3">Assigned Courses & Events</h2>
                    <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>
                        <Calendar size={18} /> View Calendar
                    </button>
                </div>

                <Card style={{ padding: 0, overflow: 'hidden' }}>
                    <Table headers={['Course', 'Event', 'Due Date', 'Status']}>
                        {loading ? (
                            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>Loading tasks...</td></tr>
                        ) : tasks.length === 0 ? (
                            <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>No assigned tasks found.</td></tr>
                        ) : (
                            tasks.map((task: any) => (
                                <tr key={task.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>{task.course_code || '-'}</td>
                                    <td style={{ padding: '1rem' }}>{task.title}</td>
                                    <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <Badge status={task.status === 'Completed' ? 'success' : task.status === 'Pending' ? 'warning' : 'info'}>
                                            {task.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))
                        )}
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default StaffDashboard;
