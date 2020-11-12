// For more information on the options refer to https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource
const aws_exports = {
    Auth: {
        region: window.config.auth.cognito.region,
        userPoolId: window.config.auth.cognito.userPoolId,
        userPoolWebClientId: window.config.auth.cognito.userPoolWebClientId,
        mandatorySignIn: true
    }
}

export default aws_exports