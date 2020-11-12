import authProvider from './authProvider'
import Auth from '@aws-amplify/auth'
import { ERROR_TYPES } from '../util/CustomError'

jest.mock('./aws-exports', () => { return { test: 'test export' } })
jest.mock('@aws-amplify/auth', () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    currentAuthenticatedUser: jest.fn(),
    configure: jest.fn()
}))

describe("authProvider - signIn", () => {

    const credentials = { 
        username: 'testUsername',
        password: 'testPassword'
    }

    const cognitoUser = {
        attributes: {
            id: '123',
            test: 'test'
        }
    }

    const testError = new Error('Test error message')


    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should login with username and password", async () => {
        const signInSpy = jest.spyOn(Auth, 'signIn')
        Auth.signIn.mockImplementation(() => Promise.resolve(cognitoUser))
        await authProvider.login(credentials)
        expect(signInSpy).toBeCalledWith(credentials.username, credentials.password)
    });

    it("should return error message if login fails", async () => {
        Auth.signIn.mockImplementation(() => Promise.reject(testError))
        await authProvider.login(credentials).catch(errorMessage => {
            expect(errorMessage).toBe(testError.message)
        })
    });

});

describe("authProvider - signOut", () => {

    const testError = new Error('Test error message')

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return true when logout is sucessfull", async () => {
        Auth.signOut.mockImplementation(() => Promise.resolve(true))
        const actualResponse = await authProvider.logout()
        expect(actualResponse).toBe(true)
    });

    it("should return error message when logout fails", async () => {
        Auth.signOut.mockImplementation(() => Promise.reject(testError))
        await authProvider.logout().catch(errorMessage => {
            expect(errorMessage).toBe(testError.message)
        })
    });

});


describe("authProvider - checkError", () => {

    const testError = new Error('Test error message')


    afterEach(() => {
        jest.clearAllMocks()
    })
  

    it("should resolve promise when error message is not USER_NOT_AUTHENTICATED_MESSAGE", async () => {
        const errorMessage = await authProvider.checkError(testError)
        expect(errorMessage).toBe(testError.message)
    });

    it("should reject promise when error message is USER_NOT_AUTHENTICATED_MESSAGE", async () => {
        const authTestError = new Error(ERROR_TYPES.USER_NOT_AUTHENTICATED_MESSAGE)
        await authProvider.checkError(authTestError).catch(errorMessage => {
            expect(errorMessage).toBe(ERROR_TYPES.USER_NOT_AUTHENTICATED_MESSAGE)
        })
    });

});

describe("authProvider - checkAuth", () => {

    const cognitoUser = {
        attributes: {
            id: '123',
            test: 'test'
        }
    }

    const testError = new Error('Test error message')


    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return cognito user when is authenticated", async () => {
        Auth.currentAuthenticatedUser.mockImplementation(() => Promise.resolve(cognitoUser))
        const actualUserProps = await authProvider.checkAuth()
        expect(actualUserProps).toStrictEqual(cognitoUser)
    });

    it("should return USER_NOT_AUTHENTICATED_MESSAGE error message when user is not authenticated", async () => {
        Auth.currentAuthenticatedUser.mockImplementation(() => Promise.reject(testError))
        await authProvider.checkAuth().catch(errorMessage => {
            expect(errorMessage).toBe(ERROR_TYPES.USER_NOT_AUTHENTICATED_MESSAGE)
        })
    });

});