import React from "react"
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('it-kamasutra.com')
    })

    test('After creation span should create',  () => {
        const component = create(<ProfileStatus status='it-kamasutra.com'/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span.length).not.toBeNull()
    })

    test('Input should be displayed in editMode instead of span',() => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus = {mockCallback}/>)
        const instance = component.getInstance()
        instance.activateEditMode()
        const root = component.root
        let input = root.findByType('input')
        expect(input.props.value).toBe('it-kamasutra.com')
        /*        const component = create(<ProfileStatus status='it-kamasutra.com'/>)
        const root = component.root
        let span = await root.findByType('span')
        debugger
        span.props.onDoubleClick()////props havent function onDoubleClick()
        let input = await root.findByType('input')
        expect(input.props.value).toBe('it-kamasutra.com')*/
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus = {mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})