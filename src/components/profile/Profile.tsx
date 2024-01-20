import React from "react"
import ProfileInfo from "./profileinfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";
import {ProfileType} from "../../types/types";

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile = {props.profile}
                         status = {props.status}
                         updateUserStatus = {props.updateUserStatus}
                         isOwner = {props.isOwner}
                         savePhoto = {props.savePhoto}
                         saveProfile = {props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}
export default Profile

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}