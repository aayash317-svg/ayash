import React from 'react';

interface BadgeProps {
    status: 'success' | 'warning' | 'error' | 'info';
    children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ status, children }) => {
    const getStyles = () => {
        switch (status) {
            case 'success': return {
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--color-success)',
                border: '1px solid rgba(16, 185, 129, 0.2)'
            };
            case 'warning': return {
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--color-warning)',
                border: '1px solid rgba(245, 158, 11, 0.2)'
            };
            case 'error': return {
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--color-error)',
                border: '1px solid rgba(239, 68, 68, 0.2)'
            };
            case 'info': return {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: 'var(--color-info)',
                border: '1px solid rgba(59, 130, 246, 0.2)'
            };
        }
    };

    return (
        <span style={{
            ...getStyles(),
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 1
        }}>
            {children}
        </span>
    );
};

export default Badge;
