import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.usersData
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getIsFollowingProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}


//import {createSelector} from "reselect";
/*export const getUsersSuperSelector = createSelector(getUsers,(users) => {
    return users.filter(u => true)
})*/