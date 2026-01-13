import React from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import { AlertTriangle } from 'lucide-react';

const SubmissionReview: React.FC = () => {
    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '1280px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-h1" style={{ marginBottom: '0.5rem' }}>Submission Review</h1>
                <p className="text-muted">Validate and approve bulk data imports.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>
                <div>
                    <Card style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-warning)' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: 'var(--color-warning)' }}>
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3 className="text-h3" style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Pending Validation: Batch #1024</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                                    System detected 2 errors and 1 warning in this batch. Please review before committing.
                                </p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-primary">Fix Manually</button>
                                    <button className="btn btn-outline">Reject Batch</button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Validation Details</h3>
                        </div>
                        <Table headers={['Row', 'Student ID', 'Course', 'Issue', 'Severity']}>
                            <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>4</td>
                                <td style={{ padding: '1rem 1.5rem' }}>S1002</td>
                                <td style={{ padding: '1rem 1.5rem' }}>CS999</td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-error)' }}>Course code does not exist</td>
                                <td style={{ padding: '1rem 1.5rem' }}><Badge status="error">Error</Badge></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>12</td>
                                <td style={{ padding: '1rem 1.5rem' }}>S1045</td>
                                <td style={{ padding: '1rem 1.5rem' }}>MA101</td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-error)' }}>Duplicate entry for semester</td>
                                <td style={{ padding: '1rem 1.5rem' }}><Badge status="error">Error</Badge></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem 1.5rem' }}>15</td>
                                <td style={{ padding: '1rem 1.5rem' }}>S1088</td>
                                <td style={{ padding: '1rem 1.5rem' }}>CS101</td>
                                <td style={{ padding: '1rem 1.5rem' }}>Grade 'C-' is below major threshold</td>
                                <td style={{ padding: '1rem 1.5rem' }}><Badge status="warning">Warning</Badge></td>
                            </tr>
                        </Table>
                    </Card>
                </div>

                <div>
                    <Card title="Batch History">
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Batch #1024</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Today, 10:30 AM</span>
                                </div>
                                <Badge status="warning">Draft</Badge>
                            </li>
                            <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Batch #1023</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Yesterday, 4:15 PM</span>
                                </div>
                                <Badge status="success">Active</Badge>
                            </li>
                            <li style={{ padding: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Batch #1022</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Oct 24, 2026</span>
                                </div>
                                <Badge status="info">Archived</Badge>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SubmissionReview;
