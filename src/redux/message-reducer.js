const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
        dialogsData: [
            {id: 1, name: "Goose Killer", url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"},
            {id: 2, name: "MR Goose", url: "https://placepic.ru/wp-content/uploads/2018/02/photo.jpg"},
            {id: 3, name: "gOOse MZFK", url: "https://th.bing.com/th/id/R.86848a8a6a3896bc5028ecc6efa51bf5?rik=Yx8NeD1z7BSRtg&riu=http%3a%2f%2fandrey-eltsov.ru%2fwp-content%2fuploads%2f2017%2f09%2fSmehAva20-300x300.jpg&ehk=uPm%2flcEuEcbW8qcUnpsCq2Se%2bCFDxEFJzpujUNT5ALA%3d&risl=&pid=ImgRaw&r=0"},
            {id: 4, name: "AMGoose", url: "https://i.ytimg.com/vi/c0lkSx-VthM/hqdefault.jpg"},
            {id: 5, name: "HendeHog", url: "https://vjoy.cc/wp-content/uploads/2020/10/unnamed-60-768x768.jpg"},
            {id: 6, name: "Crazy Parrot", url: "https://www.meme-arsenal.com/memes/6c4d4fa57ed46d574be6d67223371a2f.jpg"},
            {id: 7, name: "Big DUCK", url: "https://th.bing.com/th/id/R.9bf9fb2fefd058d6fb82d483dafc39d3?rik=dFl%2bEevg%2fZ%2bxgQ&riu=http%3a%2f%2fimg1.joyreactor.cc%2fpics%2fpost%2ffull%2f%d1%83%d1%82%d0%ba%d0%b0-%d0%b3%d1%83%d1%81%d1%8c-%d0%bb%d0%b0%d0%bf%d0%ba%d0%b8-%d0%bf%d0%b5%d1%81%d0%be%d1%87%d0%bd%d0%b8%d1%86%d0%b0-6619051.jpeg&ehk=1bDeK0qc%2fDLU3f6pgYO%2f1ZLtK13sGvJlHk5VCPOBghI%3d&risl=&pid=ImgRaw&r=0"}
        ],
        messagesData: [
            {
                id: 1,
                likesCount: 0,
                message: "Hi myBOY!!!",
                url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"
            },
            {
                id: 2,
                likesCount: 5,
                message: "HY-YOOO!How is your sifilis&",
                url: "https://placepic.ru/wp-content/uploads/2018/02/photo.jpg"
            },
            {
                id: 3,
                likesCount: 228,
                message: "WHAT?FUCKFUCKFKfkfkfk!!!",
                url: "https://th.bing.com/th/id/R.86848a8a6a3896bc5028ecc6efa51bf5?rik=Yx8NeD1z7BSRtg&riu=http%3a%2f%2fandrey-eltsov.ru%2fwp-content%2fuploads%2f2017%2f09%2fSmehAva20-300x300.jpg&ehk=uPm%2flcEuEcbW8qcUnpsCq2Se%2bCFDxEFJzpujUNT5ALA%3d&risl=&pid=ImgRaw&r=0"
            }
        ],
        newMessageText: "PYTIN XYILO!!!"
}
const messageReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE :
            let newMessage = {
                id: 4,
                likesCount: 15,
                message: state.newMessageText,
                url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"
            };
            state.messagesData.push(newMessage);
            state.newMessageText = "";
            return state;
        case UPDATE_NEW_MESSAGE_TEXT :
            state.newMessageText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateNewMessageTextActionCreator = (text) => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, newText: text};
};

export default messageReducer;