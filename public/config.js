// The idea is to update these parameters based on the environment you deploy the application.
// This could be done for instance in your CI pipeline.
window.config = {
    hasura: {
        endpoint: 'http://localhost:8080',
    },
    auth: {
        localMode: true,
        cognito: {
            region: '{region}',
            userPoolId: '{pool_id}',
            userPoolWebClientId: '{user_pool_webclient_id}',
        }
    },
    splitio: {
        authorizationKey: '5kr4vra0c7r79en108p3o1lo844ng7c23rhb'
    }
}
