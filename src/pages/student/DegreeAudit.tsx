import React from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Badge from '../../components/Badge';

const DegreeAudit: React.FC = () => {
    const courses = [
        { code: 'CS101', title: 'Intro to Programming', credits: 4, grade: 'A', status: 'Completed', semester: 'Fall 2023' },
        { code: 'CS102', title: 'Data Structures', credits: 4, grade: 'B+', status: 'Completed', semester: 'Spring 2024' },
        { code: 'MA101', title: 'Calculus I', credits: 3, grade: 'A-', status: 'Completed', semester: 'Fall 2023' },
        { code: 'CS201', title: 'Algorithms', credits: 4, grade: '-', status: 'Pending', semester: 'Fall 2025' },
    ];

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Degree Audit</h1>
            <Card title="Academic Summary">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Total Credits</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>64 / 120</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>CGPA</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3.75</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Status</p>
                        <Badge status="success">Good Standing</Badge>
                    </div>
                </div>
            </Card>

            <div style={{ marginTop: '2rem' }}>
                <Card title="Course History & Progress">
                    <Table headers={['Code', 'Title', 'Credits', 'Grade', 'Semester', 'Status']}>
                        {courses.map((course) => (
                            <tr key={course.code} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem' }}>{course.code}</td>
                                <td style={{ padding: '1rem' }}>{course.title}</td>
                                <td style={{ padding: '1rem' }}>{course.credits}</td>
                                <td style={{ padding: '1rem' }}>{course.grade}</td>
                                <td style={{ padding: '1rem' }}>{course.semester}</td>
                                <td style={{ padding: '1rem' }}>
                                    <Badge status={course.status === 'Completed' ? 'success' : 'warning'}>{course.status}</Badge>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default DegreeAudit;
