import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
const LoginForm = (props) => {
    const maxLength30 = maxLengthCreator(30)
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Email'} name={'email'} component={Input} validate={[requiredField,maxLength30]}/></div>
            <div><Field placeholder={'Password'} name={'password'} type={'password'} component={Input} validate={[requiredField,maxLength30]}/></div>
            <div><Field component={Input} name={'rememberMe'} type="checkbox"/></div> Remember me
            {props.error && <div className={s.form_summary_error}>{props.error}</div>}
            <div><button>Login</button></div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) => {
        const {email,password,rememberMe} = formData
        props.loginThunkCreator(email,password,rememberMe)
        console.log(formData)
    }

    if (props.isAuth)
        return <Navigate to={"/profile"}/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit = {onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({isAuth: state.auth.isAuth})
export default connect(mapStateToProps,{loginThunkCreator})(Login)