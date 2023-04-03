import React from "react"
import s from "./Profile.module.css";
import MyPosts from "./myposts/MyPosts"
import ProfileInfo from "./profileinfo/ProfileInfo";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts postsData={props.data.postsData}
                     dispatch={props.dispatch}/>
        </div>
    )
}
export default Profile