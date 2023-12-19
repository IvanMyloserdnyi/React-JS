import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null //if null then captcha is not required
}
const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId,email,login,isAuth) => ({type: SET_USER_DATA, payload: {userId,email,login,isAuth}});
export const getCaptchaUrlSuccess = (url) => ({type:GET_CAPTCHA_URL_SUCCESS, url})
export const getAuthDataThunk = () => async dispatch => {
        const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id,email,login,true))
    }
}
export const loginThunkCreator = (email, password, rememberMe, captcha) =>async dispatch => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthDataThunk())
        dispatch(getCaptchaUrlSuccess(null));
    }
    else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        let action = stopSubmit('login', {_error: message})
        dispatch(action)
    }
}
/*export const loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await loginPost(email, password, rememberMe, captcha);

    if (response.resultCode === 0) {
        dispatch(getOnMeThunk())
        dispatch(getCaptchaUrlSuccess(null));// зануляем captchaUrl: null
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrlThunk())
        }
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
}*/
export const logoutThunkCreator = () =>async dispatch => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null,null,null,false))
    }
}
export const getCaptchaUrl = () =>async dispatch => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export default authReducer;