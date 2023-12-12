import React from "react"
import ProfileInfo from "./profileinfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile = {props.profile}
                         status = {props.status}
                         updateUserStatus = {props.updateUserStatusThunk}
                         isOwner = {props.isOwner}
                         savePhoto = {props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    )
}
export default Profile