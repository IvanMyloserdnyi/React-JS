import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit,captchaUrl, error}) => {
    const maxLength30 = maxLengthCreator(30)
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email',"email", Input,[requiredField, maxLength30])}
            {createField<LoginFormValuesTypeKeys>('Password','password',Input,[requiredField, maxLength30],{type: 'password'})}
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe',Input,[],{type: 'checkbox'},'Remember me')}
            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('captcha', 'captcha',Input,[requiredField])}
            {error && <div className={s.form_summary_error}>{error}</div>}
            <div><button>Login</button></div>
        </form>
    )
}
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = keyof LoginFormValuesType
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>
({form: 'login'})(LoginForm)
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        const {email,password,rememberMe, captcha} = formData
        props.loginThunkCreator(email,password,rememberMe,captcha)
    }

    if (props.isAuth)
        return <Navigate to={"/profile"}/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit = {onSubmit} captchaUrl = {props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps,{loginThunkCreator})(Login)