import React from "react";
import {connect} from "react-redux";
import {followThunk, requestUsersThunk, unfollowThunk} from "../../redux/users-reducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    users: Array<UserType>
    isFetching: boolean
    isFollowingProgress: Array<number>
}
type MapDispatchToPropsType = {
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
    requestUsersThunk: (currentPage: number,pageSize: number) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.requestUsersThunk(currentPage,pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsersThunk(pageNumber,pageSize)
    }
    render() {
        return <>
            <Users    totalUsersCount = {this.props.totalUsersCount}
                      pageSize = {this.props.pageSize}
                      currentPage = {this.props.currentPage}
                      onPageChanged = {this.onPageChanged}
                      users = {this.props.users}
                      isFetching = {this.props.isFetching}
                      isFollowingProgress = {this.props.isFollowingProgress}
                      follow = {this.props.followThunk}
                      unfollow = {this.props.unfollowThunk}
            />

        </>
    }
}
let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state),
    }
}





export default compose(
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,{
        requestUsersThunk,followThunk,unfollowThunk}))
(UsersContainer)
//вместо mapDispatchToProps,главное чтобы название действия и екшнкриейтора были одинаковые,коннект сам их задиспатчит и прокинет данные
/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(follow(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollow(userId))
        },
        setUsers: (users) => {
            dispatch(setUsers(users))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPage(currentPage))
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCount(totalUsersCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetching(isFetching))
        }
    }
}*/