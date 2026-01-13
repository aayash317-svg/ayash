import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { BookOpen, Calendar, MessageSquare, ArrowRight, TrendingUp, Clock } from 'lucide-react';

const StudentDashboard: React.FC = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState<any>(null);
    const [enrolledCredits, setEnrolledCredits] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                // Fetch student details
                const { data: student, error: studentError } = await supabase
                    .from('students')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (studentError && studentError.code !== 'PGRST116') {
                    console.error('Error fetching student data:', studentError);
                } else if (student) {
                    setStudentData(student);

                    // Fetch enrolled credits for current semester
                    if (student.current_semester) {
                        const { data: enrollments, error: enrollError } = await supabase
                            .from('enrollments')
                            .select('course_code, courses(credits)')
                            .eq('student_id', user.id)
                            .eq('semester', student.current_semester);

                        if (!enrollError && enrollments) {
                            const total = enrollments.reduce((sum: number, item: any) => sum + (item.courses?.credits || 0), 0);
                            setEnrolledCredits(total);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>Loading dashboard...</div>;
    }

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '1280px' }}>
            {/* Header / Welcome Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h1 className="text-h1" style={{ marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Welcome back, <span style={{ color: 'var(--gray-900)', fontWeight: 600 }}>{profile?.full_name || user?.email}</span></p>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-surface)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Academic Status</span>
                            <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{studentData?.academic_standing || 'N/A'}</span>
                        </div>
                        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Semester</span>
                            <span style={{ fontWeight: 600 }}>{studentData?.current_semester || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <Card className="hover-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
                            <TrendingUp size={24} />
                        </div>
                        {/* Mock trend for now */}
                        <Badge status="success">+2.5%</Badge>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gray-900)' }}>{studentData?.cgpa || '0.00'}</span>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Current CGPA</p>
                </Card>

                <Card className="hover-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-md)', color: 'var(--accent-indigo)' }}>
                            <BookOpen size={24} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)' }}>Total</span>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gray-900)' }}>{studentData?.credits_earned || 0}</span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>/{studentData?.credits_required || 120}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--gray-100)', borderRadius: '3px', marginTop: '0.5rem' }}>
                        <div style={{ width: `${Math.min(((studentData?.credits_earned || 0) / (studentData?.credits_required || 120)) * 100, 100)}%`, height: '100%', backgroundColor: 'var(--accent-indigo)', borderRadius: '3px' }}></div>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Credits Completed</p>
                </Card>

                <Card className="hover-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: 'var(--primary-50)', borderRadius: 'var(--radius-md)', color: 'var(--accent-teal)' }}>
                            <Clock size={24} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)' }}>This Sem</span>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gray-900)' }}>{enrolledCredits}</span>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Credits Enrolled</p>
                </Card>

                <Card className="hover-card" style={{ padding: '1.5rem', cursor: 'pointer', border: '1px dashed var(--color-primary)' }} onClick={() => navigate('/student/audit')}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-50)', borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                            <ArrowRight size={24} />
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>View Full Audit</span>
                    </div>
                </Card>
            </div>

            {/* Quick Actions Grid */}
            <h2 className="text-h3" style={{ marginBottom: '1.5rem' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <Card
                    style={{ cursor: 'pointer', transition: 'var(--transition-base)', height: '100%' }}
                    className="hover-card"
                >
                    <div onClick={() => navigate('/student/audit')} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', color: 'var(--color-primary)' }}>
                                <BookOpen size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Degree Audit Tool</h3>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                            Analyze your degree progress, check missing requirements, and ensure you are on track for graduation.
                        </p>
                        <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Open Audit <ArrowRight size={16} />
                        </span>
                    </div>
                </Card>

                <Card
                    style={{ cursor: 'pointer', transition: 'var(--transition-base)', height: '100%' }}
                    className="hover-card"
                >
                    <div onClick={() => navigate('/student/schedule')} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', color: 'var(--accent-amber)' }}>
                                <Calendar size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Schedule Optimizer</h3>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                            AI-powered tool to help you build the perfect class schedule based on your time and professor preferences.
                        </p>
                        <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Optimize Schedule <ArrowRight size={16} />
                        </span>
                    </div>
                </Card>

                <Card
                    style={{ cursor: 'pointer', transition: 'var(--transition-base)', height: '100%' }}
                    className="hover-card"
                >
                    <div onClick={() => navigate('/student/chat')} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', color: 'var(--accent-rose)' }}>
                                <MessageSquare size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Support Assistant</h3>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                            24/7 AI-assistant to help answer questions about policies, prerequisites, and campus resources.
                        </p>
                        <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Start Chat <ArrowRight size={16} />
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
