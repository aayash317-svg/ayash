import React from 'react';

interface BadgeProps {
    status: 'success' | 'warning' | 'error' | 'info';
    children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ status, children }) => {
    const getColors = () => {
        switch (status) {
            case 'success': return { bg: 'rgba(46, 125, 50, 0.1)', color: 'var(--color-success)' };
            case 'warning': return { bg: 'rgba(237, 108, 2, 0.1)', color: 'var(--color-warning)' };
            case 'error': return { bg: 'rgba(211, 47, 47, 0.1)', color: 'var(--color-error)' };
            case 'info': return { bg: 'rgba(2, 136, 209, 0.1)', color: 'var(--color-info)' };
        }
    };

    const { bg, color } = getColors();

    return (
        <span style={{
            backgroundColor: bg,
            color: color,
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600
        }}>
            {children}
        </span>
    );
};

export default Badge;
