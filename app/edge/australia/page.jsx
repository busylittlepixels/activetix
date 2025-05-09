import EdgeFunctionExplainer from '../explainer';

export const metadata = {
    title: 'In The Netherlands'
};

export default function Page() {
    return (
        <>
            <h1 className="mb-8">You are in The Netherlands!</h1>
            <EdgeFunctionExplainer />
        </>
    );
}
