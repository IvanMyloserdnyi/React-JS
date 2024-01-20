import React from "react";
import styles from './users.module.css'
import defaultUsersPhoto from '../../assets/photos/default_user_image.png'
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";


const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div key={user.id}>
            <span>
                <NavLink to={'/Profile/' + user.id}>
                <img src={user.photos.small === null ? defaultUsersPhoto : user.photos.small} alt="Фото юзера"
                     className={styles.userPhoto}/>
                </NavLink>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => unfollow(user.id)}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => follow(user.id)}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.cityName'}</div>
                </span>
            </span>
        </div>
    )
}
export default User

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}