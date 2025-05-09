'use client';

import { getNetlifyContext } from 'utils';
import { Alert } from './alert';
import { Markdown } from './markdown';

const noNetlifyContextAlert = `
For full functionality, either run this site locally via \`netlify dev\`
([see docs](https://docs.netlify.com/cli/local-development/")) or deploy it to Netlify.
`;

export function ContextAlert(props) {
    const { warningMessage, className } = props;
    const ctx = getNetlifyContext();

    let markdownText = null;
    if (!ctx) {
        markdownText = noNetlifyContextAlert;
    } else if (ctx === 'dev' && warningMessage) {
        markdownText = warningMessage;
    }

    if (markdownText) {
        return (
            <Alert className={className}>
                <Markdown content={markdownText} />
            </Alert>
        );
    } else {
        return <></>;
    }
}
