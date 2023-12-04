import React from "react"
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import defaultUsersPhoto from '../../../assets/photos/default_user_image.png'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.description_block}>
                <img  src={profile.photos.large === null ? defaultUsersPhoto : profile.photos.large} alt='User photo' className={s.userPhoto}/>
                <h2>Имя: {profile.fullName}</h2>
                <h3>Обо мне: {profile.aboutMe}</h3>
                <div>
                    <h3>В поиске работы: {profile.lookingForAJob === true? 'ДА' : 'Нет'}</h3>
                    <h4>Как так получилось: {profile.lookingForAJobDescription}</h4>
                </div>
                <div>
                    <h3>Contacts:</h3>
                    <ul>
                        {Object.entries(profile.contacts).map(([key,value]) => (
                            !!value && <li key={key}>
                                <h5>{key}: <a href={value}>{value}</a></h5>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <ProfileStatusWithHooks status = {status} updateStatus = {updateUserStatus}/>
            </div>
        </div>
    )
}
export default ProfileInfo