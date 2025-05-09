import EdgeFunctionExplainer from '../explainer';

export const metadata = {
    title: 'Not The Netherlands'
};

export default function Page() {
    return (
        <>
            <h1 className="mb-8">You&apos;re not in The Netherlands!</h1>
            <EdgeFunctionExplainer />
        </>
    );
}
