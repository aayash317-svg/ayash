import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, title, className = '', style = {} }) => {
    return (
        <div className={`card ${className}`} style={style}>
            {title && <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)', fontSize: '1.25rem' }}>{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
