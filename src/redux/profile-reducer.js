const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
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
                url: "https://placepic.ru/wp-content/uploads/2018/02/photo.jpg"
            },
            {
                id: 3,
                likesCount: 228,
                message: "GA!GA!GA!GAGAGA!GAAAA!GA))0)0)MOTHERFUCKER!",
                url: "https://th.bing.com/th/id/R.86848a8a6a3896bc5028ecc6efa51bf5?rik=Yx8NeD1z7BSRtg&riu=http%3a%2f%2fandrey-eltsov.ru%2fwp-content%2fuploads%2f2017%2f09%2fSmehAva20-300x300.jpg&ehk=uPm%2flcEuEcbW8qcUnpsCq2Se%2bCFDxEFJzpujUNT5ALA%3d&risl=&pid=ImgRaw&r=0"
            }
        ],
        newPostText: "PYTIN CHMO!!!"
}

const profileReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                likesCount: 8,
                message: state.newPostText,
                url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"
            };
            state.postsData.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text};
};

export default profileReducer;