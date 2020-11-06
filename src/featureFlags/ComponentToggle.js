import React from 'react'
import { Loading } from 'react-admin'
import { SplitTreatments } from '@splitsoftware/splitio-react'

const ComponentToggle = (props) => {
    const renderContent = (treatmentWithConfig) => {
        const { treatment } = treatmentWithConfig
        return (treatment === 'on') ? props.children : null
    }
    return (
        <SplitTreatments names={[props.featureFlagname]} >
            {({ treatments, isReady }) => {
                const treatmentWithConfig = treatments[props.featureFlagname]
                return isReady ? renderContent(treatmentWithConfig) : <Loading/>
            }}
        </SplitTreatments>
    )
}

export default ComponentToggle