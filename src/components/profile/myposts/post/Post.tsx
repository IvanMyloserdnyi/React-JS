import React from "react"
import s from "./Post.module.css";

const Post: React.FC<PropsType> = (props) => {

    return  (
      <div className={s.item}>
        <img src={props.urlPhoto}></img>
         {props.message}
         <div>
          {props.LikesAmount}
          <span> Like</span>
         </div>
      </div>
    )
}
export default Post

type PropsType = {
    urlPhoto: string
    message: string
    LikesAmount: number
}