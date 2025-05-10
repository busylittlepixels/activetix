'use client';

import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
    return (
        <div className={['bg-white rounded-sm text-neutral-600', className].filter(Boolean).join(' ')}>
            <div className="flex flex-col gap-4 px-6 py-8">
                {title && <h3 className="text-neutral-900">{title}</h3>}
                {children}
            </div>
        </div>
    );
} 