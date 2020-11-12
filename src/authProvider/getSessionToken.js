import Auth from '@aws-amplify/auth'
import CustomError, { ERROR_TYPES } from '../util/CustomError'

const getSessionToken = async () => {
    if(window.config.auth.localMode) return ''
    try{
        const cognitoUserSession =  await Auth.currentSession() // This method automatically refreshes the accessToken and idToken
        return cognitoUserSession.getIdToken().jwtToken
    }catch(error){
        throw new CustomError(ERROR_TYPES.USER_NOT_AUTHENTICATED, error.message)
    }
}

export default getSessionToken 