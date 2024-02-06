import React, {useEffect} from "react";
import Preloader from "../Common/Preloader/Preloader";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followThunk, requestUsersThunk, unfollowThunk} from "../../redux/users-reducer";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/redux-store";


type PropsType = {}
export const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getIsFollowingProgress)
    const isFetching = useSelector(getIsFetching)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsersThunk(currentPage,pageSize, filter))
    },[])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsersThunk(pageNumber,pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsersThunk(1,pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId))
    }
    return <div>
        <UsersSearchForm onFilterChanged = {onFilterChanged}/>
        <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged} portionSize = {10}/>

        <div>
            {
                isFetching
                ? <Preloader/>
                : users.map(user =>
                    <div key={user.id}><User user={user}
                                             followingInProgress={followingInProgress}
                                             follow={follow}
                                             unfollow={unfollow}/></div>)
            }
        </div>
    </div>
}
