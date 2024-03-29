import {instance, APIResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type MeResponseDataType = {
        id: number
        email: string
        login: string
}
type LoginResponseDataType = {
        userId: number
}
/*type LogoutResponseType = {
    data: Object
    resultCode: ResultCodesEnum
    messages: Array<string>,
}*/
export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>('auth/me')
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null = null) {
        return instance.post<APIResponseType<LoginResponseDataType,ResultCodesEnum | ResultCodeForCaptcha>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login')
    }
}