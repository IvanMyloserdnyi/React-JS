import {authAPI} from "../api/api";

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
        authAPI.me()
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