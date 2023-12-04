import React from "react";
import styles from './users.module.css'
import defaultUsersPhoto from '../../assets/photos/default_user_image.png'
import {NavLink} from "react-router-dom";

let User = ({user, isFollowingProgress, follow, unfollow}) => {
    return (
        <div key={user.id}>
            <span>
                <NavLink to={'/Profile/' + user.id}>
                <img src={user.photos.small === null ? defaultUsersPhoto : user.photos.small} alt="Фото юзера"
                     className={styles.userPhoto}/>
                </NavLink>
                <div>
                    {user.followed
                        ? <button disabled={isFollowingProgress.some(id => id === user.id)}
                            onClick={() => unfollow(user.id)}>Unfollow</button>
                        : <button disabled={isFollowingProgress.some(id => id === user.id)}
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