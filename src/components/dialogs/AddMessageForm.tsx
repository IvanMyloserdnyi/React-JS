import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {createField, Textarea} from "../Common/FormsControls/FormsControls";
import {NewMessageFormValuesType} from "./Dialogs";

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, OwnPropsType>
    & OwnPropsType> = (props) => {
    const maxLength15 = maxLengthCreator(15)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {/*<Field name = 'newMessageElement' placeholder='Enter your message' component={Textarea} validate={[requiredField,maxLength15]}/>*/}
                {createField<NewMessageFormValuesTypeKeys>('Enter your message', 'newMessageElement',
                    Textarea, [requiredField, maxLength15])}
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, OwnPropsType>
({form: 'dialogAddMassageForm'})(AddMessageForm)

type OwnPropsType = {}
type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>