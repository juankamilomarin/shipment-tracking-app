describe("spliltIOFactory", () => {
    const defualtTestConfig = JSON.parse(JSON.stringify(window.config))

    beforeEach(() => {
        window.config = defualtTestConfig
        jest.resetModules()
        jest.mock('@splitsoftware/splitio-react', () => ({
            SplitSdk: jest.fn()
        }))        
    })

    it("should return SDK with default configuration", () => {
        const splitIOReact = require('@splitsoftware/splitio-react');
        const expectedConfig = {
            core: {
                authorizationKey: window.config.splitio.authorizationKey,
                key: 'CUSTOMER_ID'
            },
            startup: {
                readyTimeout: 1.5
            }
        }
        const sdkSpy =  jest.spyOn(splitIOReact, 'SplitSdk')
        require('./splitIOFactory')
        expect(sdkSpy).toBeCalledWith(expectedConfig)
    });

    it("should return SDK with default localhost configuration", () => {
        const splitIOReact = require('@splitsoftware/splitio-react');
        const config = {
            splitio: {
                localhostMode: true,
                localhostSettings: 'testSettings'
            }
        }
        window.config = config
        const sdkSpy =  jest.spyOn(splitIOReact, 'SplitSdk')
        require('./splitIOFactory')
        expect(sdkSpy).toBeCalledWith('testSettings')
    });

});