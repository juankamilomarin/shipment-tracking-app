import setupProvider from './setupProvider'
import Auth from '@aws-amplify/auth'

jest.mock('./aws-exports', () => { return { test: 'test export' } })
jest.mock('@aws-amplify/auth', () => ({
    configure: jest.fn()
}))

describe("setupProvider", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should setup AWS provider with the given config file", () => {
        let actualAwsExports = {}
        Auth.configure.mockImplementation((awsExports) => {
            actualAwsExports = awsExports
        })
        setupProvider()
        expect(actualAwsExports).toStrictEqual({ test: 'test export' })
    });

});