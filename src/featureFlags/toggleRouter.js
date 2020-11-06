import { SHOW_COURIERS } from "./flagNames"
import { COURIER } from '../dataProvider/resources'
import splitIOFactory from './splitIOFactory'

export const isFlagOn = (featureFlagName) => {
    const client = splitIOFactory.client()
    const treatment = client.getTreatment(featureFlagName)
    return treatment === 'on'
}

export const getActiveResources = (baseResources) => {
    return baseResources.filter(resource => {
        // Add any feature flag related-logic to add resources that should be hidden
        if(resource.props.name === COURIER){ 
            return isFlagOn(SHOW_COURIERS)
        }
        return true
    })
}