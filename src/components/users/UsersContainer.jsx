import React from "react";
import {connect} from "react-redux";
import {
    followThunk, getUsersThunk,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollowThunk
} from "../../redux/users-reducer";
import Users from "./Users";
import {Navigate} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage,this.props.pageSize)
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsersThunkCreator(pageNumber,this.props.pageSize)
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
        users: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingProgress: state.usersPage.isFollowingProgress,
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
const actions = { setCurrentPage, toggleIsFollowingProgress,getUsersThunkCreator: getUsersThunk,followThunkCreator: followThunk,unfollowThunkCreator: unfollowThunk} //вместо mapDispatchToProps,главное чтобы название действия и екшнкриейтора были одинаковые,коннект сам их задиспатчит и прокинет данные



export default compose(
    connect(mapStateToProps,actions))
(UsersContainer)
