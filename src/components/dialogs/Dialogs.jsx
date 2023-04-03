import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/message-reducer";


const Dialogs = (props) => {
        let state = props.store.getState().dialogsPage;
        let dialogsElements = state.dialogsData
            .map( d => <DialogItem id={d.id} name={d.name} urlphoto={d.url} /> );
        let messagesElements = state.messagesData
            .map( m => <Message message={m.message} /> );
        let newMessageText = state.newMessageText;

        let newMessageElement = React.createRef();
        let addMessage = () => {
            props.store.dispatch(addMessageActionCreator());
        }
        let onMessageChange = () => {
            let text = newMessageElement.current.value;
            let message_action = props.store.dispatch(updateNewMessageTextActionCreator(text));
            props.store.dispatch(message_action)
        }
    return (
        <div className={s.dialogs}>
            <div className ={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <textarea value={newMessageText} onChange={onMessageChange} ref={newMessageElement}></textarea>
                <br/><button onClick={addMessage}>Отправить</button>
            </div>
        </div>
    )
}
export default Dialogs