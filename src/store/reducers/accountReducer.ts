import {actionTypes, IAction} from "../actions";


const accountReducer = (state = {}, {type, ...payload}: IAction) => {
    switch (type) {
        case actionTypes.LOGIN:
            return {...state, ...payload};
        default:
            return state
    }
}

export default accountReducer
