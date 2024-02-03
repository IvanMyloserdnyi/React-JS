import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state: InitialStateType
beforeEach(() => {
    state = {
        usersData: [
            {id: 0, name: 'string', status: 'string',
                photos: {small: null, large: null}, followed: false},
            {id: 1, name: 'Evan', status: 'BlaBlaMYbOY',
                photos: {small: null, large: null}, followed: false},
            {id: 2, name: 'string1', status: 'string3',
                photos: {small: null, large: null}, followed: false},
            {id: 3, name: 'string2', status: 'string2',
                photos: {small: null, large: null}, followed: true},
            {id: 4, name: 'string3', status: 'string1',
                photos: {small: null, large: null}, followed: true}
        ],
        pageSize: 100,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
})

test('follow success', () => {
   const newState = usersReducer(state,
       actions.followSuccess(1))
    expect(newState.usersData[0].followed).toBeFalsy()
    expect(newState.usersData[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const newState = usersReducer(state,
        actions.unfollowSuccess(4))
    expect(newState.usersData[3].followed).toBeTruthy()
    expect(newState.usersData[4].followed).toBeFalsy()
})