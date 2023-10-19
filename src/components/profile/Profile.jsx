import React from "react"
import ProfileInfo from "./profileinfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile = {props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile