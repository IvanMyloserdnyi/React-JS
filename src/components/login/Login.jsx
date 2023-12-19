import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
const LoginForm = ({handleSubmit,captchaUrl, error}) => {
    const maxLength30 = maxLengthCreator(30)
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email','email',Input,[requiredField, maxLength30])}
            {createField('Password','password',Input,[requiredField, maxLength30],{type: 'password'})}
            {createField(null, 'rememberMe',Input,null,{type: 'checkbox'},'Remember me')}
            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField('captcha', 'captcha',Input,requiredField)}
            {error && <div className={s.form_summary_error}>{error}</div>}
            <div><button>Login</button></div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) => {
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
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps,{loginThunkCreator})(Login)