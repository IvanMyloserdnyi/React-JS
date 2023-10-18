import React from 'react'
import styles from './users.module.css'
import axios from "axios";
import defaultUsersPhoto from '../../assets/photos/default_user_image.png'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(res => {
            this.props.setUsers(res.data.items)
            this.props.setTotalUsersCount(res.data.totalCount);
        })
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(res => {
            this.props.setUsers(res.data.items);
        })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        const pages = [];
        for (let i = 1;i <= pagesCount; i++) {
            pages.push(i)
        }
        return <div>
            <div>
                {pages.map(p => {
                    return <span key={`page_${p}`} className={this.props.currentPage === p ? styles.selectedPage : ''}
                    onClick={() => this.onPageChanged(p)}>{p}</span>
                })}
            </div>
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