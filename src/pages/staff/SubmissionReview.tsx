import React from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Badge from '../../components/Badge';

const SubmissionReview: React.FC = () => {
    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Submission Review</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <Card title="Pending Submission: Batch #1024">
                        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff3e0', border: '1px solid #ffd54f', borderRadius: '4px' }}>
                            <strong>Validation Status:</strong> 2 Errors, 1 Warning found.
                        </div>

                        <Table headers={['Row', 'Student ID', 'Course', 'Issue', 'Severity']}>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>4</td>
                                <td style={{ padding: '0.5rem' }}>S1002</td>
                                <td style={{ padding: '0.5rem' }}>CS999</td>
                                <td style={{ padding: '0.5rem' }}>Course code does not exist</td>
                                <td style={{ padding: '0.5rem' }}><Badge status="error">Error</Badge></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>12</td>
                                <td style={{ padding: '0.5rem' }}>S1045</td>
                                <td style={{ padding: '0.5rem' }}>MA101</td>
                                <td style={{ padding: '0.5rem' }}>Duplicate entry for semester</td>
                                <td style={{ padding: '0.5rem' }}><Badge status="error">Error</Badge></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem' }}>15</td>
                                <td style={{ padding: '0.5rem' }}>S1088</td>
                                <td style={{ padding: '0.5rem' }}>CS101</td>
                                <td style={{ padding: '0.5rem' }}>Grade 'C-' is below major threshold</td>
                                <td style={{ padding: '0.5rem' }}><Badge status="warning">Warning</Badge></td>
                            </tr>
                        </Table>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-outline">Correct Manually</button>
                            <button className="btn btn-primary">Resubmit File</button>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card title="Version History">
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Batch #1024</span>
                                <Badge status="warning">Draft</Badge>
                            </li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Batch #1023</span>
                                <Badge status="success">Active</Badge>
                            </li>
                            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Batch #1022</span>
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
