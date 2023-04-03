import React from "react"
import s from "./Post.module.css";

const Post = (props) => {

    return  (
      <div className={s.item}>
        <img src={props.urlphoto}></img>
         {props.message}
         <div>
          {props.LikesAmount}
          <span> Like</span>
         </div>
      </div>
    )
}
export default Post