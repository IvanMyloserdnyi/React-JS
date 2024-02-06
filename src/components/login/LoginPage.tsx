import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
import {AppDispatch, AppStateType} from "../../redux/redux-store";


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit,captchaUrl, error}) => {
    const maxLength30 = maxLengthCreator(30)
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email',"email", Input,
                [requiredField, maxLength30])}
            {createField<LoginFormValuesTypeKeys>('Password','password',Input,
                [requiredField, maxLength30],{type: 'password'})}
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe',Input,
                [],{type: 'checkbox'},'Remember me')}
            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('captcha', 'captcha',Input,
                [requiredField])}
            {error && <div className={s.form_summary_error}>{error}</div>}
            <div><button>Login</button></div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>
({form: 'login'})(LoginForm)


export const LoginPage: React.FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch: AppDispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {
        const {email,password,rememberMe, captcha} = formData
        dispatch(loginThunkCreator(email,password,rememberMe,captcha))
    }

    if (isAuth)
        return <Navigate to={"/profile"}/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit = {onSubmit} captchaUrl = {captchaUrl}/>
    </div>
}




type LoginFormOwnProps = {
    captchaUrl: string | null
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>