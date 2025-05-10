import EdgeFunctionExplainer from '../explainer';
import { PageContainer } from 'components/page-container';

export const metadata = {
    title: 'In The Netherlands'
};

export default function Page() {
    return (
        <PageContainer className="py-8 md:py-12">
            <h1 className="mb-8">You are in The Netherlands!</h1>
            <EdgeFunctionExplainer />
        </PageContainer>
    );
}
