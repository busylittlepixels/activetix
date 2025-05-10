'use client';

import { getNetlifyContext } from '../utils';
import { Alert } from './alert';
import { Markdown } from './markdown';

interface ContextAlertProps {
  warningMessage?: string;
  className?: string;
}

const noNetlifyContextAlert = `
For full functionality, either run this site locally via \`netlify dev\`
([see docs](https://docs.netlify.com/cli/local-development/")) or deploy it to Netlify.
`;

export function ContextAlert(props: ContextAlertProps) {
    const { warningMessage, className } = props;
    const ctx = getNetlifyContext();

    let markdownText: string | null = null;
    if (!ctx) {
        markdownText = noNetlifyContextAlert;
    } else if (ctx === 'dev' && warningMessage) {
        markdownText = warningMessage;
    }

    if (markdownText) {
        return (
            <Alert className={className}>
                <Markdown content={markdownText} className="" />
            </Alert>
        );
    } else {
        return <></>;
    }
} 