import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import s from './FormsControls.module.css'
import {FieldValidatorType} from "../../../utils/validators/validators";
import React from "react";

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error},children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + ' ' + (hasError? s.error : +'')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
export const Textarea:React.FC<WrappedFieldProps> = (props) => {
    const {input,meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input:React.FC<WrappedFieldProps> = (props) => {
    const {input,meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}


export function createField<KeysType extends string>(placeholder: string | undefined,
                            name: KeysType,
                            component: React.FC<WrappedFieldProps>,
                            validators: Array<FieldValidatorType>,
                            props = {},
                            text = '') {
    return (
        <div>
            <Field
                placeholder={placeholder} name={name} component={component} validate={validators} {...props}
            />{text}
        </div>
    )
}

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}
export type GetStringKeys<T> = Extract<keyof T, string>