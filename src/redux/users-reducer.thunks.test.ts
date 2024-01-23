import {actions, followThunk, unfollowThunk} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock("../api/users-api")
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType ={
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

/*beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})*/


test('success follow thunk', async () => {
    const thunk = followThunk(1)

    userAPIMock.follow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleIsFollowingProgress(false, 1))
})
test('success unfollow thunk', async () => {
    const thunk = unfollowThunk(1)

    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleIsFollowingProgress(false, 1))
})