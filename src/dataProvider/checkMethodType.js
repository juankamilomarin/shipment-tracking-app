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
import CustomError, { ERROR_TYPES } from '../util/CustomError'

const checkMethodType = (type) => {
    if(type !== GET_LIST 
        && type !== GET_MANY 
        && type !== GET_ONE 
        && type !== UPDATE 
        && type !== UPDATE_MANY 
        && type !== CREATE 
        && type !== DELETE 
        && type !== DELETE_MANY 
        && type !== GET_MANY_REFERENCE) throw new CustomError(ERROR_TYPES.METHOD_NOT_VALID, `Not valid type ${type}`) 
}

export default checkMethodType