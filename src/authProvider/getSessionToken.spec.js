import getSessionToken from './getSessionToken'
import Auth from '@aws-amplify/auth'

jest.mock('@aws-amplify/auth', () => ({
    currentSession: jest.fn()
}))

describe("getSessionToken", () => {

    beforeAll(() => {
        global.console.error = () => {}
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should get token when it's still valid", async () => {
        Auth.currentSession.mockImplementation(() => Promise.resolve({
            getIdToken: () => ({
                jwtToken: 'sessionToken'
            })
        }))
        const sessionToken = await getSessionToken()
        expect(sessionToken).toStrictEqual('sessionToken')
    });

});