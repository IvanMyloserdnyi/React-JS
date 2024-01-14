import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI, profileAPI as profileApi} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

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
                url: "https://img.freepik.com/premium-photo/a-duck-wearing-sunglasses-isolated-on-background_875864-671.jpg"
            },
            {
                id: 3,
                likesCount: 228,
                message: "GA!GA!GA!GAGAGA!GAAAA!GA))0)0)MOTHERFUCKER!",
                url: "https://th.bing.com/th/id/R.86848a8a6a3896bc5028ecc6efa51bf5?rik=Yx8NeD1z7BSRtg&riu=http%3a%2f%2fandrey-eltsov.ru%2fwp-content%2fuploads%2f2017%2f09%2fSmehAva20-300x300.jpg&ehk=uPm%2flcEuEcbW8qcUnpsCq2Se%2bCFDxEFJzpujUNT5ALA%3d&risl=&pid=ImgRaw&r=0"
            }
        ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state=initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let newPost = {
                id: 4,
                likesCount: 8,
                message: action.newPostText,
                url: "https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900"
            };
            return {
                ...state,
                postsData: [...state.postsData,newPost],
                newPostText: ''
            };
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 'SN/PROFILE/SET_STATUS':
            return {...state, status: action.status}
        case 'SN/PROFILE/DELETE_POST':
            return {...state, postsData: state.postsData.filter((p) => p.id !== action.postId)}
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getProfileDataThunk = (userId: number): ThunkType =>async dispatch => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getUserStatusThunk = (userId: number): ThunkType =>async dispatch => {
    const data = await profileApi.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateUserStatusThunk = (status: string): ThunkType =>async dispatch => {
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType =>async dispatch => {
    const data = await profileApi.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType =>async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile)
    if (data.resultCode === 0) {
        if(userId != null) {
            dispatch(getProfileDataThunk(userId))
        }
        else {
            throw new Error('UserId cant be null')
        }

    }
    else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        let action = stopSubmit('edit-profile', {_error: message})
        //let action = stopSubmit('edit-profile',{'contacts':{'facebook': message}})
        dispatch(action)
        return Promise.reject(message)
    }
}

export default profileReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>
//or type ThunkType = BaseThunkType<ActionsType | FormAction>