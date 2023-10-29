import React from "react"
import s from "./MyPosts.module.css";
import Post from "./post/Post";
import {Field, reduxForm} from "redux-form";




const MyPosts = (props) => {
    let postsElements = props.postsData
        .map( (p,index) =>
            <div key = {index}>
                <Post LikesAmount={p.likesCount} message={p.message} urlphoto={p.url}/>
            </div>);
    const addNewPost = (newPostData) => {
        props.addPost(newPostData.newPostText)
    }
    return  (
    <div className={s.postsBlock}>
        <h3>My Posts</h3>
        <div >
          <AddNewPostFormRedux onSubmit = {addNewPost}/>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
   </div>
    )
}
const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newPostText' placeholder='Enter your post'/>
            </div>
            <div><button>Add Post</button></div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({form: 'profileAddPostForm'})(AddNewPostForm)
export default MyPosts