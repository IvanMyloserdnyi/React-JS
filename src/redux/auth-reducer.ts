import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: true,
    captchaUrl: null as string | null //if null then captcha is not required
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state;
    }
}

const actions = {
    setAuthUserData:
        (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: 'SN/AUTH/SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess:
        (url: string | null) => ({type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', url} as const)
}

export const getAuthDataThunk = (): ThunkType => async dispatch => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType =>
    async dispatch => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthDataThunk())
        dispatch(actions.getCaptchaUrlSuccess(null));
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
        let action = stopSubmit('login', {_error: message})
        dispatch(action)
    }
}

export const logoutThunkCreator = (): ThunkType => async dispatch => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async dispatch => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>