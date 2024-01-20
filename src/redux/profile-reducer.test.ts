import profileReducer, {actions} from "./profile-reducer";


let state = {
    postsData: [
        {
            id: 1,
            likesCount: 0,
            message: "Hi,i am a Killer Goose,be careful!!",
            url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"
        },
        {
            id: 2,
            likesCount: 5,
            message: "Hi,MOTHER OF GOD!!",
            url: "https://img.freepik.com/premium-photo/a-duck-wearing-sunglasses-isolated-on-background_875864-671.jpg"
        },
        {
            id: 3,
            likesCount: 228,
            message: "GA!GA!GA!GAGAGA!GAAAA!GA))0)0)MOTHERFUCKER!",
            url: "https://th.bing.com/th/id/R.86848a8a6a3896bc5028ecc6efa51bf5?rik=Yx8NeD1z7BSRtg&riu=http%3a%2f%2fandrey-eltsov.ru%2fwp-content%2fuploads%2f2017%2f09%2fSmehAva20-300x300.jpg&ehk=uPm%2flcEuEcbW8qcUnpsCq2Se%2bCFDxEFJzpujUNT5ALA%3d&risl=&pid=ImgRaw&r=0"
        }
    ],
    profile: null,
    status: ''
}
test('length of posts should be incremented', () => {
    //1. test data
    let action = actions.addPostActionCreator('new post text')
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.postsData.length).toBe(4)
    expect(newState.postsData[3].message).toBe('new post text')
})
test('message of new post should be correct', () => {
    //1. test data
    let action = actions.addPostActionCreator('new post text')
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.postsData[3].message).toBe('new post text')
})
test('after deleting length of message should be decrement', () => {
    //1. test data
    let action = actions.deletePost(1)
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.postsData.length).toBe(2 )
})
test('after deleting length shouldn`t be decrement if id is incorrect', () => {
    //1. test data
    let action = actions.deletePost(1000)
    //2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.postsData.length).toBe(3 )
})
