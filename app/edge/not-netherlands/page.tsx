import { Markdown } from 'components/markdown';
import { explainer } from '../explainer';
import { PageContainer } from 'components/page-container';

export const metadata = {
    title: 'Not Netherlands'
};

export default function NotNetherlandsPage() {
    return (
        <PageContainer className="py-8 md:py-12">
            <h1 className="mb-8">Hello from outside the Netherlands! 🌍</h1>
            <p className="mb-4">
                This page is shown to visitors from anywhere outside the Netherlands.
                The edge function has detected your country is not the Netherlands and redirected you here.
            </p>
            <Markdown content={explainer} />
        </PageContainer>
    );
} 