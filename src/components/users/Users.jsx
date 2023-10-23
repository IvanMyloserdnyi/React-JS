import React from "react";
import styles from './users.module.css'
import defaultUsersPhoto from '../../assets/photos/default_user_image.png'
import Preloader from "../Common/Preloader/Preloader";
import {NavLink} from "react-router-dom";


let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span key={`page_${p}`} className={props.currentPage === p ? styles.selectedPage : ''}
                             onClick={() => props.onPageChanged(p)}>{p}</span>
            })}
        </div>
        {
            props.isFetching
                ? <Preloader/>
                : props.users.map(u => <div key={u.id}>
            <span>
                <NavLink to={'/Profile/' + u.id}>
                <img src={u.photos.small === null ? defaultUsersPhoto : u.photos.small} alt="Фото юзера" className={styles.userPhoto}/>
                </NavLink>
                {u.followed ?
                    <button disabled={props.isFollowingProgress.some(id => id === u.id)} onClick={() => props.unfollow(u.id)}>Unfollow</button>
                    : <button disabled={props.isFollowingProgress.some(id => id === u.id)} onClick={() => props.follow(u.id)}>Follow</button>}
            </span>
                <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.cityName'}</div>
                </span>
            </span>
            </div>)
        }
    </div>

}
export default Users