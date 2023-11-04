import { getAuthDataThunk } from "./auth-reducer";
const SET_INITIALIZED = 'SET_INITIALIZED';
let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_INITIALIZED: {
            return { ...state, initialized: true }
        }
        default:
            return state;
    }
}

export const initializingSuccess = () => ( { type: SET_INITIALIZED })

export const initializeAppThunk = () => async dispatch => {
    let promise = []
    promise.push(dispatch(getAuthDataThunk()))
    await Promise.all(promise)
    dispatch(initializingSuccess())
}
export default appReducer;