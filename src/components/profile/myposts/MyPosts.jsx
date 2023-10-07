import React from "react"
import s from "./MyPosts.module.css";
import Post from "./post/Post";




const MyPosts = (props) => {
    let postsElements = props.postsData
        .map( (p,index) =>
            <div key = {index}>
                <Post LikesAmount={p.likesCount} message={p.message} urlphoto={p.url}/>
            </div>);
    let newPostElement = React.createRef();
    let onAddPost = () => {
        props.addPost()
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
        /*props.dispatch(newVar); я не понял нахрена єта строка моєно так props.dispatch({type:'UPDATE-NEW-POST-TEXT', newText: text});
        * а можно и так let posts_action = {type:'UPDATE-NEW-POST-TEXT', newText: text};
        props.dispatch(posts_action);*/
    }
    return  (
    <div className={s.postsBlock}>
        <h3>My Posts</h3>
        <div >
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
          <br/><button onClick={onAddPost}>Add Post</button><button>Reset</button>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
   </div>
    )
}
export default MyPosts