import { SplitSdk } from '@splitsoftware/splitio-react'

function getSettings(){
    let settings
    if (window.config.splitio.localhostMode){
        settings = window.config.splitio.localhostSettings
    } else {
        settings = {
            core: {
                authorizationKey: window.config.splitio.authorizationKey,
                key: 'CUSTOMER_ID'
            },
            startup: {
                readyTimeout: 1.5
            }
        }
    }
    return settings
}

const splitIOFactory = SplitSdk(getSettings())

export default splitIOFactory