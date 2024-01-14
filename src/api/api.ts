import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9a6dd39a-c42f-4e63-bf98-b8cde886a912'
    }
})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}