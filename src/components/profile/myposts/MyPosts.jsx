import React from "react"
import s from "./MyPosts.module.css";
import Post from "./post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";




const MyPosts = React.memo((props) => {
    console.log('RENDER MY POSTS')
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
})
const AddNewPostForm = (props) => {
    const maxLength15 = maxLengthCreator(15)
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component= {Textarea} name='newPostText' placeholder='Enter your post' validate={[requiredField, maxLength15]}/>
            </div>
            <div><button>Add Post</button></div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({form: 'profileAddPostForm'})(AddNewPostForm)
export default MyPosts