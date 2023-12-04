import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";


let Users = ({
                 isFetching, users, isFollowingProgress,
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
                    <div key={user.id}><User user={user} isFollowingProgress={isFollowingProgress} follow={follow} unfollow={unfollow}/></div>)
            }
        </div>
    </div>

}
export default Users