import s from './FormsControls.module.css'

const FormControl = ({input,meta,child, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + ' ' + (hasError? s.error : +'')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Textarea = (props) => {
    const {input,meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input = (props) => {
    const {input,meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
/*
export const Element = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + " " + (hasError ? s.error : '')}>
            <div>
                <props.elementType {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}*/
//<Field  component={Element} elementType='input'> куча ошибок, реакт дом не признает свойство elementType