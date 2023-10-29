import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

const LoginForm = (props) => {
    const maxLength10 = maxLengthCreator(10)
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Login'} name={'login'} component={Input} validate={[requiredField,maxLength10]}/></div>
            <div><Field placeholder={'Password'} name={'password'} component={Input} validate={[requiredField,maxLength10]}/></div>
            <div><Field component={Input} name={'rememberMe'} type="checkbox"/></div> Remember me
            <div><button>Login</button></div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit = {onSubmit}/>
    </div>
}
export default Login