import React, { useContext } from 'react';
import { SplitFactory, SplitContext } from '@splitsoftware/splitio-react';
import splitIOFactory from './splitIOFactory';

const Children = (props) => {
    const { isReady, isTimedout } = useContext(SplitContext)
    return isReady || isTimedout ? props.children : null
}

const FeatureFlagProvider = (props) => (
    <SplitFactory factory={splitIOFactory} >
        <Children>{props.children}</Children>
    </SplitFactory>
)

export default FeatureFlagProvider
