import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

/*export type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    isFetching: boolean
    captchaUrl: string | null
}*/
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null as string | null //if null then captcha is not required
}
export type InitialStateType = typeof initialState
const authReducer = (state=initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null,email: string | null,login: string | null,isAuth: boolean): SetAuthUserDataActionType => (
    {
        type: SET_USER_DATA,
        payload: {userId,email,login,isAuth}
    });

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    url: string | null
}
export const getCaptchaUrlSuccess = (url: string | null): GetCaptchaUrlSuccessType => ({type:GET_CAPTCHA_URL_SUCCESS, url})
export const getAuthDataThunk = () => async (dispatch: any) => {
        const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(setAuthUserData(id,email,login,true))
    }
}
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: any) =>async (dispatch: any) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthDataThunk())
        dispatch(getCaptchaUrlSuccess(null));
    }
    else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
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
export const logoutThunkCreator = () =>async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null,null,null,false))
    }
}
export const getCaptchaUrl = () =>async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export default authReducer;