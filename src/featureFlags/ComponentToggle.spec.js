import React from 'react';
import { render } from '@testing-library/react'
import ComponentToggle from './ComponentToggle'
import * as reactAdmin from 'react-admin';
import * as splitIOReact from '@splitsoftware/splitio-react';

jest.mock('react-admin')
jest.mock('@splitsoftware/splitio-react', () => ({
    SplitTreatments: jest.fn()
}))

describe("Component Toggle", () => {

    beforeEach(() => {
        splitIOReact.SplitTreatments.mockImplementation((props) => {
            const { names, children } = props
            if(names[0] === 'treatment_not_ready'){
                return children({ isReady: false, treatments: [] })
            } else {
                return children({ 
                    isReady: true, 
                    treatments: {
                        treatment_on: { treatment: 'on'},
                        treatment_off: { treatment: 'off'}
                    } 
                })
            }
        })
        reactAdmin.Loading.mockImplementation(() => <div data-testid='loading'></div>)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should render Loading component when feature flags are not ready", () => {
        const { getByTestId } = render(
                <ComponentToggle featureFlagname='treatment_not_ready'/>
        )
        expect(getByTestId('loading')).toBeInTheDocument()
    });

    it("should render children when treatment is on", () => {
        const TestComponent1 = () => <div data-testid='child-1'></div>
        const TestComponent2 = () => <div data-testid='child-2'></div>
        const { queryByTestId } = render(
                <ComponentToggle featureFlagname='treatment_on'>
                    <TestComponent1/>
                    <TestComponent2/>
                </ComponentToggle>
        )
        expect(queryByTestId('child-1')).toBeInTheDocument()
        expect(queryByTestId('child-2')).toBeInTheDocument()
    });

    it("should not render children when treatment is off", () => {
        const TestComponent1 = () => <div data-testid='child-1'></div>
        const TestComponent2 = () => <div data-testid='child-2'></div>
        const { queryByTestId } = render(
                <ComponentToggle featureFlagname='treatment_off'>
                    <TestComponent1/>
                    <TestComponent2/>
                </ComponentToggle>
        )
        expect(queryByTestId('child-1')).not.toBeInTheDocument()
        expect(queryByTestId('child-2')).not.toBeInTheDocument()
    });
});