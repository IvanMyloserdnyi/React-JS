import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";


let store = {
    _state: {
        profilePage: {
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
        },
        dialogsPage: {
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
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('State Changed');
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = messageReducer(this._state.dialogsPage, action)

        this._callSubscriber(this._state);
       /*
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 4,
                likesCount: 8,
                message: this._state.profilePage.newPostText,
                url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        }
        else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
        if (action.type === 'ADD-MESSAGE') {
            let newMessage = {
                id: 4,
                likesCount: 15,
                message: this._state.dialogsPage.newMessageText,
                url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"
            };
            this._state.dialogsPage.messagesData.push(newMessage);
            this._state.dialogsPage.newMessageText = "";
            this._callSubscriber(this._state);
        }
        else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.newText;
            this._callSubscriber(this._state);
        }*/
    }
};

export default store;

// store - OOP

