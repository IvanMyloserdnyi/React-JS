import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {Navigate} from "react-router-dom";


const Dialogs = (props) => {
        let state = props.dialogsPage;
        let dialogsElements = state.dialogsData
            .map( (d,index) =>
                <div key={index}>
                    <DialogItem id={d.id} name={d.name} urlphoto={d.url}/>
                </div>);
        let messagesElements = state.messagesData
            .map( (m,index) =>
                <div key={index}>
                    <Message message={m.message}/>
                </div> );
        let newMessageText = state.newMessageText;

        let newMessageElement = React.createRef();
        let onAddMessage = () => {
            props.addMessage();
        }
        let onMessageChange = () => {
            let text = newMessageElement.current.value;
            props.updateNewMessageText(text)
        }
        if (!props.isAuth) return <Navigate to = '/login'/>
    return (
        <div className={s.dialogs}>
            <div className ={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea value={newMessageText} onChange={onMessageChange} ref={newMessageElement}></textarea>
                <br/><button onClick={onAddMessage}>Отправить</button>
            </div>
        </div>
    )
}
export default Dialogs