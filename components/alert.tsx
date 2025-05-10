'use client';

import { ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'info';

interface AlertProps {
  children: ReactNode;
  className?: string;
  type?: AlertType;
}

export function Alert({ children, className, type }: AlertProps) {
    return (
        <div
            className={[
                'flex gap-4 p-4 rounded-sm',
                type === 'error' ? 'bg-rose-400 text-neutral-900' : 'bg-primary text-primary-content',
                className
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </div>
    );
} 