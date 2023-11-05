import React from "react";
import {connect} from "react-redux";
import {followThunk, requestUsersThunk, toggleIsFollowingProgress, unfollowThunk} from "../../redux/users-reducer";
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


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsersThunk(this.props.currentPage,this.props.pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.requestUsersThunk(pageNumber,this.props.pageSize)
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
                      follow = {this.props.followThunkCreator}
                      unfollow = {this.props.unfollowThunkCreator}
            />

        </>
    }
}
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state),
    }
}

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
const actions = {toggleIsFollowingProgress,requestUsersThunk,followThunkCreator: followThunk,unfollowThunkCreator: unfollowThunk} //вместо mapDispatchToProps,главное чтобы название действия и екшнкриейтора были одинаковые,коннект сам их задиспатчит и прокинет данные



export default compose(
    connect(mapStateToProps,actions))
(UsersContainer)
