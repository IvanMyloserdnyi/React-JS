import React from "react"
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import defaultUsersPhoto from '../../../assets/photos/default_user_image.png'
import ProfileStatus from './ProfileStatus'


const ProfileInfo = (props) => {
    const profile = props.profile
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
                <ProfileStatus status = {'Hello my friends!'}/>
            </div>
{/*            <div>
                <img src="https://live.staticflickr.com/3071/2768511618_def21cfaf1.jpg"/>
            </div>
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
            <div className={s.description_block}>
                <img  src="https://stellar-syrniki-edb0f2.netlify.app/img/%D0%9A%D1%80%D0%B8%D0%BF%D1%82%D0%BE%D0%93%D1%83%D1%81%D1%8C%20%D0%9B%D0%B0%D0%BF%D1%87%D0%B0%D1%82%D0%B8%D0%B9.jpg"/>
                <br/>WiteFooted CryptoGoose <br/> Hi bro!Nice to mit you!Remember-Im a wery RICH goose.
            </div>*/}
        </div>
    )
}
export default ProfileInfo