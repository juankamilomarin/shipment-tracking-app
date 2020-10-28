import checkMethodType from './checkMethodType'
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    UPDATE,
    UPDATE_MANY,
    CREATE,
    DELETE,
    DELETE_MANY
} from 'react-admin'

describe("checkMethodType", () => {

    beforeAll(() => {
        global.console.error = () => {}
    })

    it("should throw error if method type is not supported by react-admin", () => {
        const notValidType = 'NOT_VALID_TYPE'
        expect(() => checkMethodType(notValidType)).toThrow(`Not valid type ${notValidType}`)
    });

    it("should pass for method types supported by react-admin", () => {
        expect(() => checkMethodType(GET_LIST)).not.toThrow()
        expect(() => checkMethodType(GET_MANY)).not.toThrow()
        expect(() => checkMethodType(GET_ONE)).not.toThrow()
        expect(() => checkMethodType(UPDATE)).not.toThrow()
        expect(() => checkMethodType(UPDATE_MANY)).not.toThrow()
        expect(() => checkMethodType(CREATE)).not.toThrow()
        expect(() => checkMethodType(DELETE)).not.toThrow()
        expect(() => checkMethodType(DELETE_MANY)).not.toThrow()
        expect(() => checkMethodType(GET_MANY_REFERENCE)).not.toThrow()
    });

});