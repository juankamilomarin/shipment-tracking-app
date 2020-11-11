import React from 'react'
import LoginPage from './LoginPage'
import theme from './theme'
import { render } from '@testing-library/react'
import { Login } from 'react-admin'

jest.mock('./theme')
jest.mock('react-admin', () => ({
    Login: jest.fn()
}))

describe("LoginPage", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should render login with application theme", () => {
        let actualProps = {}
        Login.mockImplementation((props) => {
            actualProps = props
            return null
        })
        render(<LoginPage/>)
        expect(actualProps.theme).toStrictEqual(theme)
    });

});