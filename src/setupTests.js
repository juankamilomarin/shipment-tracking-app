// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

window.config = {
    hasura: {
        endpoint: 'http://localhost:8080',
    },
    auth: {
        cognito: {
            region: 'region',
            userPoolId: 'pool_id',
            userPoolWebClientId: 'user_pool_webclient_id',
        }
    },
    splitio: {
        authorizationKey: 'testKey'
    }
}
