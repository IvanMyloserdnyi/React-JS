import React from "react";
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogItem: React.FC<PropsType> = (props) => {

    let path = "/dialogs/" + props.id;
    return (
        <div className={[s.dialog, s.active].join(' ')}>
           <img src={props.urlPhoto}/> <br/> <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem

type PropsType = {
    id: number
    urlPhoto: string
    name: string
}