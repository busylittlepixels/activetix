'use client';

import { ReactNode } from 'react';
import MarkdownToJsx from 'markdown-to-jsx';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
    return (
        <MarkdownToJsx
            className={['markdown', className].filter(Boolean).join(' ')}
        >
            {content}
        </MarkdownToJsx>
    );
} 