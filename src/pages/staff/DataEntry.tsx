import React, { useState } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';


const DataEntry: React.FC = () => {
    const [method, setMethod] = useState<'upload' | 'table' | 'text'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [textData, setTextData] = useState('');

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        alert('File uploaded (mock)');
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--color-primary)' }}>Data Entry</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    className={`btn ${method === 'upload' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setMethod('upload')}
                >
                    File Upload
                </button>
                <button
                    className={`btn ${method === 'table' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setMethod('table')}
                >
                    Manual Entry
                </button>
                <button
                    className={`btn ${method === 'text' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setMethod('text')}
                >
                    Plain Text
                </button>
            </div>

            <Card title={method === 'upload' ? 'Upload Excel/CSV' : method === 'table' ? 'Enter Data' : 'Paste Data'}>
                {method === 'upload' && (
                    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ border: '2px dashed var(--color-border)', padding: '2rem', width: '100%', textAlign: 'center', borderRadius: '8px' }}>
                            <p>Drag and drop files here or click to select</p>
                            <input
                                type="file"
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                style={{ marginTop: '1rem' }}
                            />
                        </div>
                        {file && <p>Selected: {file.name}</p>}
                        <button type="submit" className="btn btn-primary">Upload & Validate</button>
                    </form>
                )}

                {method === 'table' && (
                    <div>
                        <Table headers={['Student ID', 'Course Code', 'Grade', 'Semester']}>
                            <tr>
                                <td><input type="text" placeholder="S123" style={{ width: '100%' }} /></td>
                                <td><input type="text" placeholder="CS101" style={{ width: '100%' }} /></td>
                                <td><input type="text" placeholder="A" style={{ width: '100%' }} /></td>
                                <td><input type="text" placeholder="Fall 2024" style={{ width: '100%' }} /></td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="" style={{ width: '100%' }} /></td>
                                <td><input type="text" placeholder="" style={{ width: '100%' }} /></td>
                                <td><input type="text" placeholder="" style={{ width: '100%' }} /></td>
                                <td><input type="text" placeholder="" style={{ width: '100%' }} /></td>
                            </tr>
                        </Table>
                        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Submit Data</button>
                    </div>
                )}

                {method === 'text' && (
                    <div>
                        <textarea
                            value={textData}
                            onChange={e => setTextData(e.target.value)}
                            placeholder="Paste data here (Student ID, Course Code, Grade, Semester)..."
                            style={{ width: '100%', height: '200px', padding: '1rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        />
                        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Parse & Submit</button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default DataEntry;
