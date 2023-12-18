import React, {useState} from "react"
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import defaultUsersPhoto from '../../../assets/photos/default_user_image.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false)
    const onSubmit = (formData) => {
        saveProfile(formData)
            .then(() => setEditMode(false))
        //
    }
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={s.description_block}>
                <div><img src={profile.photos.large === null
                    ? defaultUsersPhoto
                    : profile.photos.large}
                          alt='User photo' className={s.userPhoto}/>
                </div>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataForm initialValues = {profile}
                                       profile={profile}
                                       onSubmit = {onSubmit}

                    />
                    : <ProfileData profile={profile}
                                   isOwner = {isOwner}
                                   activateEditMode = {() => setEditMode(true)}/> }
            </div>
            <div>
                <ProfileStatusWithHooks status={status} updateStatus={updateUserStatus}/>
            </div>
        </div>
    )
}
const ProfileData = ({profile, isOwner, activateEditMode}) => {
    return (
        <div>
                {isOwner && <div><button onClick={activateEditMode}>Edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob === true ? 'Yes' : 'No'}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                {!Object.values(profile.contacts).every(value => value === null) && <Contacts profile={profile}/>}
            </div>
        </div>)
}

const Contacts = ({profile}) => {
    return (
        <div>
            <h3>Contacts:</h3>
            <ul>
                {Object.entries(profile.contacts).map(([key, value]) => (
                    !!value && <li key={key}>
                        <h5>{key}: <a href={value}>{value}</a></h5>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ProfileInfo