import React from "react"
import s from "./MyPosts.module.css";
import Post from "./post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";




const MyPosts = (props) => {
    let postsElements = props.postsData
        .map( p => <Post LikesAmount={p.likesCount} message={p.message} urlphoto={p.url} /> );
    let newPostElement = React.createRef();
    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        let post_action = updateNewPostTextActionCreator(text);
        props.dispatch(post_action);
        /*props.dispatch(newVar); я не понял нахрена єта строка моєно так props.dispatch({type:'UPDATE-NEW-POST-TEXT', newText: text});
        * а можно и так let posts_action = {type:'UPDATE-NEW-POST-TEXT', newText: text};
        props.dispatch(posts_action);*/
    }
    return  (
    <div className={s.postsBlock}>
        <h3>My Posts</h3>
        <div >
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
          <br/><button onClick={addPost}>Add Post</button><button>Reset</button>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
   </div>
    )
}
export default MyPosts