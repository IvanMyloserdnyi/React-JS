import React from "react";
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from "../../login/Login.module.css";

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={s.form_summary_error}>{error}</div>}
            <div>
                <b>Full name</b>: {createField('Full name', 'fullName', Input, [])}
            </div>
            <div>
                <b>Looking for a job</b>:
                {createField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField('My professional skills', 'lookingForAJobDescription', Textarea, [])}
            </div>
            <div>
                <b>About me</b>:
                {createField('About me', 'aboutMe', Textarea, [])}
            </div>
            <div>
                <b>Contacts:</b>
                <ul>
                    {Object.keys(profile.contacts).map((key) => (
                            <b key={key}>{key}: {createField(key, 'contacts.' + key, Input, [])}</b>
                    ))}
                </ul>
                {/*{!Object.values(profile.contacts).every(value => value === null) && <Contacts profile={profile}/>}*/}
            </div>
        </form>)
}
const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataReduxForm