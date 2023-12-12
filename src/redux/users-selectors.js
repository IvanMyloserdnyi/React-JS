
export const getUsers = (state) => {
    return state.usersPage.usersData
}

//import {createSelector} from "reselect";
/*export const getUsersSuperSelector = createSelector(getUsers,(users) => {
    return users.filter(u => true)
})*/
export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}
export const getIsFollowingProgress = (state) => {
    return state.usersPage.isFollowingProgress
}