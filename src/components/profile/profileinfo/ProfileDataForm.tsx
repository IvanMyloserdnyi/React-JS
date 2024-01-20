import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../../login/Login.module.css";
import {ProfileType} from "../../../types/types";

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormOwnPropsType>
    & ProfileDataFormOwnPropsType> = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={s.form_summary_error}>{error}</div>}
            <div>
                <b>Full name</b>: {createField<ProfileDataFormKeysType>('Full name','fullName', Input,
                [])}
            </div>
            <div>
                <b>Looking for a job</b>: {createField<ProfileDataFormKeysType>('','lookingForAJob', Input,
                [], {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills</b>: {createField<ProfileDataFormKeysType>('My professional skills',
                'lookingForAJobDescription', Textarea, [])}
            </div>
            <div>
                <b>About me</b>:
                {createField<ProfileDataFormKeysType>('About me', 'aboutMe', Textarea, [])}
            </div>
            <div>
                <b>Contacts:</b>
                <ul>
                    {/*todo: create some solution for embedded objects*/}
                    {Object.keys(profile.contacts).map((key) => (
                            <b key={key}>{key}: {createField
                            (key, 'contacts.' + key, Input, [])}</b>
                    ))}
                </ul>
                {/*{!Object.values(profile.contacts).every(value => value === null) && <Contacts profile={profile}/>}*/}
            </div>
        </form>)
}
const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormOwnPropsType>
({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataReduxForm

type ProfileDataFormOwnPropsType = {
    profile: ProfileType
}
type ProfileDataFormKeysType = GetStringKeys<ProfileType>