import Auth from '@aws-amplify/auth'
import { ERROR_TYPES } from '../util/CustomError'

const login = ({ username, password }) => Auth.signIn(username, password)
        .catch(error => Promise.reject(error.message))

const logout = () => Auth.signOut().catch(error => Promise.reject(error.message))

/*
    checkError is called everytime there is an error in the data provider (aka API promise is rejected by any reason).
        We need to differentiate between an authentication error (this is identified and thrown in methodFactory.getGraphQLRequest, 
        when the token is refreshed and it's not valid anymore) and the rest of the errors. 
        An authentication error should redirect the user to the logout page, to accomplish this a rejected promise should be returned.
        If the error is of another type, the user could still browse the app, for these cases we need to return a resolved promise
        with the given error message.
        More info could be found here: https://marmelab.com/react-admin/Authentication.html#catching-authentication-errors-on-the-api
*/
const checkError = (error) => { 
    if(error.message === ERROR_TYPES.USER_NOT_AUTHENTICATED_MESSAGE){
        return Promise.reject(ERROR_TYPES.USER_NOT_AUTHENTICATED_MESSAGE)
    }
    return Promise.resolve(error.message)
}

/*
    checkAuth is called in some parts of the app to assert that the user is still authenticated.
        If the call to currentAuthenticatedUser is successful the promise will resolve and the application will work as expected,
        on the other hand, if there is an error (which means that the user is not authenticated) we need to return a rejected promise with
        the specific error message.
        More info could be found here: https://marmelab.com/react-admin/Authentication.html#checking-credentials-during-navigation
*/
const checkAuth = () => Auth.currentAuthenticatedUser()
        .catch(() => Promise.reject(ERROR_TYPES.USER_NOT_AUTHENTICATED_MESSAGE))

const getPermissions = () => Promise.resolve() // There's no need to implement permission/role base logic (for now)

const localProvider = {
    login: ({ username }) => {
        localStorage.setItem('username', username);
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};

const authProvider = {
    login,
    logout,
    checkError,
    checkAuth,
    getPermissions
}

export default  window.config.auth.localMode ? localProvider : authProvider