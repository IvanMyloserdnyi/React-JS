import React, {EffectCallback, useEffect} from "react";
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
import { useNavigate, useSearchParams} from "react-router-dom";
import queryString from "query-string";


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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    type QueryParamsType = {term?: string, page?: string, friend?: string}
    useEffect(() => {
        const query : QueryParamsType = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)
        navigate({
            pathname: '/users',
            search: queryString.stringify(query) // или`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage]);

    useEffect(() => {

        const parsed = queryString.parse(searchParams.toString()) as QueryParamsType
        //const parsed = Object.fromEntries(searchParams) // или так

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend)
            switch (parsed.friend) {
                case 'null' :
                    actualFilter = {...actualFilter, friend: null}
                    break
                case 'true' :
                    actualFilter = {...actualFilter, friend: true}
                    break
                default :
                    actualFilter = {...actualFilter, friend: false}
            }
        dispatch(requestUsersThunk(actualPage,pageSize, actualFilter))
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
