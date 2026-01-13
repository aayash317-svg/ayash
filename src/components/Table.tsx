import React from 'react';
import type { ReactNode } from 'react';

interface TableProps {
    headers: string[];
    children: ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                        {headers.map((header, index) => (
                            <th key={index} style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
