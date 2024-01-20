import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";


type PropsType = {
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
let Users: React.FC<PropsType> = ({
                 isFetching, users, followingInProgress,
                 follow, unfollow, totalUsersCount,
                 pageSize, currentPage, onPageChanged
             }) => {
    return <div>
        <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged} portionSize = {10}/>

        <div>
            {
                isFetching
                ? <Preloader/>
                : users.map(user =>
                    <div key={user.id}><User user={user} followingInProgress={followingInProgress}
                                             follow={follow} unfollow={unfollow}/></div>)
            }
        </div>
    </div>

}
export default Users