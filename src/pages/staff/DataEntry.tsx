import React, { useState } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { Upload, FileText, Type, CheckCircle } from 'lucide-react';

const DataEntry: React.FC = () => {
    const [method, setMethod] = useState<'upload' | 'table' | 'text'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [textData, setTextData] = useState('');

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        alert('File uploaded (mock)');
    };

    return (
        <div className="container" style={{ padding: '2rem 0', maxWidth: '1000px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-h1" style={{ marginBottom: '0.5rem' }}>Data Entry</h1>
                <p className="text-muted">Import student records via file upload or manual entry.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '0.5rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', width: 'fit-content', border: '1px solid var(--gray-200)' }}>
                <button
                    className={`btn ${method === 'upload' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setMethod('upload')}
                    style={{ border: method === 'upload' ? 'none' : 'none' }}
                >
                    <Upload size={18} /> File Upload
                </button>
                <button
                    className={`btn ${method === 'table' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setMethod('table')}
                    style={{ border: method === 'table' ? 'none' : 'none' }}
                >
                    <FileText size={18} /> Manual Grid
                </button>
                <button
                    className={`btn ${method === 'text' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setMethod('text')}
                    style={{ border: method === 'text' ? 'none' : 'none' }}
                >
                    <Type size={18} /> Plain Text
                </button>
            </div>

            <Card title={method === 'upload' ? 'Upload Excel/CSV' : method === 'table' ? 'Spreadsheet Entry' : 'Paste Raw Data'}>
                {method === 'upload' && (
                    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', padding: '2rem 0' }}>
                        <div style={{
                            border: '2px dashed var(--gray-300)',
                            padding: '3rem',
                            width: '100%',
                            textAlign: 'center',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: 'var(--gray-50)',
                            transition: 'var(--transition-base)',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--gray-300)'}
                        >
                            <Upload size={48} color="var(--gray-400)" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontWeight: 500, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Drag and drop files here or click to select</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Supports .xlsx, .csv, .json</p>
                            <input
                                type="file"
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                style={{ marginTop: '1rem', opacity: 0, position: 'absolute', width: '1px', height: '1px' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="btn btn-outline" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Browse Files</label>
                        </div>
                        {file && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontWeight: 500 }}>
                                <CheckCircle size={18} /> Selected: {file.name}
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary btn-lg" disabled={!file}>Upload & Validate</button>
                    </form>
                )}

                {method === 'table' && (
                    <div style={{ padding: '0.5rem 0' }}>
                        <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Enter data row by row. Press Tab to move to the next cell.</p>
                        <Table headers={['Student ID', 'Course Code', 'Grade', 'Semester']}>
                            <tr>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="S123" className="form-input" /></td>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="CS101" className="form-input" /></td>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="A" className="form-input" /></td>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="Fall 2026" className="form-input" /></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="S..." className="form-input" /></td>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="CS..." className="form-input" /></td>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="-" className="form-input" /></td>
                                <td style={{ padding: '0.5rem' }}><input type="text" placeholder="Fall 2026" className="form-input" /></td>
                            </tr>
                        </Table>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button className="btn btn-primary">Submit Data</button>
                        </div>
                    </div>
                )}

                {method === 'text' && (
                    <div>
                        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Paste tab-separated or comma-separated values.</p>
                        <textarea
                            value={textData}
                            onChange={e => setTextData(e.target.value)}
                            placeholder="Student ID, Course Code, Grade, Semester..."
                            className="form-input"
                            style={{ minHeight: '300px', fontFamily: 'monospace', fontSize: '0.875rem' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button className="btn btn-primary">Parse & Submit</button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default DataEntry;
