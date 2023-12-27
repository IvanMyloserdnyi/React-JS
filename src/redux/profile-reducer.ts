import {profileAPI as profileApi, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


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
type InitialStateType = typeof initialState
const profileReducer = (state=initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
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
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST:
            return {...state, postsData: state.postsData.filter((p) => p.id !== action.postId)}
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string):AddPostActionCreatorType => ({type: ADD_POST, newPostText});
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type:SET_USER_PROFILE, profile});
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type:SET_STATUS, status})
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type:DELETE_POST, postId})
type SavePhotoSuccessActionType ={
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getProfileDataThunk = (userId: number) =>async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getUserStatusThunk = (userId: number) =>async (dispatch: any) => {
    const response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateUserStatusThunk = (status: string) =>async (dispatch: any) => {
    const response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: any) =>async (dispatch: any) => {
    const response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) =>async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileDataThunk(userId))
    }
    else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        let action = stopSubmit('edit-profile', {_error: message})
        //let action = stopSubmit('edit-profile',{'contacts':{'facebook': message}})
        dispatch(action)
        return Promise.reject(message)
    }
}

export default profileReducer;