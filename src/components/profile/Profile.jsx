import React from "react"
import ProfileInfo from "./profileinfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";

const Profile = (props) => {
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