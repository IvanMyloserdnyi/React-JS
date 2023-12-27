import { getAuthDataThunk } from "./auth-reducer";
const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialStateType = {
    initialized: boolean
}
let initialState: initialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type){
        case SET_INITIALIZED: {
            return { ...state, initialized: true}
        }
        default:
            return state;
    }
}

type InitializingSuccessActionType = {
    type: typeof SET_INITIALIZED
}
export const initializingSuccess = (): InitializingSuccessActionType => ( { type: SET_INITIALIZED })

export const initializeAppThunk = () => async (dispatch: any) => {
    let promise = []
    promise.push(dispatch(getAuthDataThunk()))
    await Promise.all(promise)
    dispatch(initializingSuccess())
}
export default appReducer;