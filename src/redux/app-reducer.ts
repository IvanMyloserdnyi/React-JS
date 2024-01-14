import { getAuthDataThunk } from "./auth-reducer";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type){
        case 'SN/APP/SET_INITIALIZED': {
            return { ...state, initialized: true}
        }
        default:
            return state;
    }
}

export const actions = {
    initializingSuccess: () => ({ type: 'SN/APP/SET_INITIALIZED'} as const)
}

export const initializeAppThunk = (): ThunkType => async dispatch => {
    let promise = []
    promise.push(dispatch(getAuthDataThunk()))
    await Promise.all(promise)
    dispatch(actions.initializingSuccess())
}
export default appReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof  actions>
type ThunkType = BaseThunkType<ActionsType>