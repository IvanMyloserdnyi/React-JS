import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true
}
const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId,email,login,isAuth) => ({type: SET_USER_DATA, payload: {userId,email,login,isAuth}});
export const getAuthDataThunk = () => {
    return (dispatch) => {
        return authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    let {id, login, email} = res.data.data
                    dispatch(setAuthUserData(id,email,login,true))
                }
            })
    }
}
export const loginThunkCreator = (email, password, rememberMe) => dispatch => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(getAuthDataThunk())
            }
            else {
                let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
                let action = stopSubmit('login', {_error: message})
                dispatch(action)
            }
        })
}
export const logoutThunkCreator = () => dispatch => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null,null,null,false))
            }
        })
}
export default authReducer;