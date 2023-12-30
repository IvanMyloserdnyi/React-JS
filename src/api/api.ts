import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9a6dd39a-c42f-4e63-bf98-b8cde886a912'
    }
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Outdated method. Use profileAPI')
        return profileAPI.getProfile(userId)
    }
};
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status})
    },
    savePhoto(photo: any) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile)
    }

}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LogoutResponseType = {
    data: Object
    resultCode: ResultCodesEnum
    messages: Array<string>,
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me')
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login')
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}

