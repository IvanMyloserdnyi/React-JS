import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Textarea} from "../../Common/FormsControls/FormsControls";
import React from "react";

const AddNewPostForm:  React.FC<InjectedFormProps<AddPostFormValuesType, AddPostFormOwnProps> & AddPostFormOwnProps>= (props) => {
    const maxLength15 = maxLengthCreator(15)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>('Enter your post','newPostText',Textarea,
                    [requiredField, maxLength15])}
{/*                <Field component={Textarea} name='newPostText' placeholder='Enter your post'
                       validate={[requiredField, maxLength15]}/>*/}
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}
export const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, AddPostFormOwnProps>
({form: 'profileAddPostForm'})(AddNewPostForm)

export type AddPostFormValuesType = {newPostText: string}
type AddPostFormOwnProps = {}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>