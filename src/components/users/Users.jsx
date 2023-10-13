import React from 'react'
import styles from './users.module.css'
import axios from "axios";
import defaultUsersPhoto from '../../assets/photos/default_user_image.png'
class Users extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(res => {
            this.props.setUsers(res.data.items)
        })
    }
    render() {
        return <div>
            {
                this.props.users.map(u => <div key={u.id}>
            <span>
                <img src={u.photos.small === null ? defaultUsersPhoto : u.photos.small} alt="Фото юзера" className={styles.userPhoto}/>
                {u.followed
                    ? <button onClick={() => {this.props.unfollow(u.id)}}>Unfollow</button>
                    : <button onClick={() => {this.props.follow(u.id)}}>Follow</button>}
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
}
export default Users