import React from "react"
import s from "./MyPosts.module.css";
import Post from "./post/Post";
import {AddNewPostFormRedux, AddPostFormValuesType} from "./AddNewPostForm";
import {PostType} from "../../../types/types";

const MyPosts: React.FC<PropsType> =(props) => {
    let postsElements = [...props.postsData]
        .reverse()
        .map( (p,index) =>
            <div key = {index}>
                <Post LikesAmount={p.likesCount} message={p.message} urlPhoto={p.url}/>
            </div>);
    const addNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
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
const MyPostMemorized = React.memo(MyPosts)
export default MyPostMemorized

type PropsType = MapPropsType & DispatchPropsType
export type MapPropsType = {
    postsData: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (post: string) => void
}