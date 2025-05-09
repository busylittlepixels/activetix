const rewrite = async (request, context) => {
    const path = context.geo?.country?.code === 'NL' ? '/edge/netherlands' : '/edge/not-netherlands';
    return new URL(path, request.url);
};

export const config = {
    path: '/edge'
};

export default rewrite;
