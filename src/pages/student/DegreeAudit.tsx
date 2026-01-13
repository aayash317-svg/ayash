import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import { Download, AlertCircle, CheckCircle2 } from 'lucide-react';

const DegreeAudit: React.FC = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState<any[]>([]);
    const [studentData, setStudentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                // Fetch student stats
                const { data: student, error: studentError } = await supabase
                    .from('students')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (studentError && studentError.code !== 'PGRST116') console.error(studentError);
                if (student) setStudentData(student);

                // Fetch enrollments with course details
                const { data: enrollments, error: enrollError } = await supabase
                    .from('enrollments')
                    .select('semester, grade, status, courses(code, title, credits)')
                    .eq('student_id', user.id)
                    .order('semester', { ascending: false });

                if (enrollError) console.error(enrollError);

                if (enrollments) {
                    const formattedCourses = enrollments.map((e: any) => ({
                        code: e.courses?.code,
                        title: e.courses?.title,
                        credits: e.courses?.credits,
                        grade: e.grade || '-',
                        status: e.status,
                        semester: e.semester
                    }));
                    setCourses(formattedCourses);
                }
            } catch (error) {
                console.error('Error fetching audit data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>Loading audit...</div>;
    }

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '1280px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="text-h1" style={{ marginBottom: '0.5rem' }}>Degree Audit</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>{studentData?.major || 'General'} - {studentData?.level || 'Undergraduate'}</p>
                </div>
                <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Download size={18} /> Download PDF
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <Card>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Academic Summary</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gray-900)' }}>{studentData?.cgpa || '0.00'}</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'block' }}>Current CGPA</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gray-900)' }}>{studentData?.credits_earned || 0}</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'block' }}>Credits Earned</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem' }}>
                        <CheckCircle2 size={16} color="var(--color-success)" />
                        <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>All requirements for current level met</span>
                    </div>
                </Card>

                <Card style={{ borderLeft: '4px solid var(--accent-amber)' }}>
                    <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Advising Alerts</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <AlertCircle size={24} color="var(--accent-amber)" style={{ marginTop: '0.125rem' }} />
                        <div>
                            <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>Elective Requirement</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                                You need 4 more credits of Humanities electives before Senior year. Consider registering for HS201 visually.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card title="Course History & Progress" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <h3 className="text-h3" style={{ fontSize: '1.25rem' }}>Detailed Course List</h3>
                </div>
                <Table headers={['Code', 'Title', 'Credits', 'Grade', 'Semester', 'Status']}>
                    {courses.map((course: any, index: number) => (
                        <tr key={index} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background-color 0.2s' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{course.code}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{course.title}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{course.credits}</td>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{course.grade}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{course.semester}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                                <Badge status={course.status === 'Completed' ? 'success' : 'warning'}>{course.status}</Badge>
                            </td>
                        </tr>
                    ))}
                </Table>
            </Card>
        </div>
    );
};

export default DegreeAudit;
