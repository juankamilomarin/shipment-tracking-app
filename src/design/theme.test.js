import theme from './theme'

jest.mock('@material-ui/core/styles', () => ({
    createMuiTheme: (props) => props
}))

describe("Theme", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("Setup props are set correctly", () => {
        let actualThemeProps = theme
        const expectedThemeProps = {
            palette: { 
              primary: {
                main: '#1565C0'
              },
              secondary: {
                main: '#2196f3'
              },
              success: {
                main: '#7db82f'
              },
              error: {
                main: '#ec4239'
              }
            },
            typography: {
              fontFamily: ['"Lato"', 'Arial', 'sans-serif'].join(','),
            },
            props: {
              MuiButtonBase: {
                disableRipple: true
              }
            }
        }
        expect(actualThemeProps).toStrictEqual(expectedThemeProps)
    });

});