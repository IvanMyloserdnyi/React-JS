import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {InitialStateType} from "../../redux/message-reducer";
import {AddMessageFormRedux} from "./AddMessageForm";

const Dialogs: React.FC<PropsType> = (props) => {
        let state = props.dialogsPage;
        let dialogsElements = state.dialogsData
            .map( (d,index) =>
                <div key={index}>
                    <DialogItem id={d.id} name={d.name} urlPhoto={d.url}/>
                </div>);
        let messagesElements = state.messagesData
            .map( (m,index) =>
                <div key={index}>
                    <Message message={m.message}/>
                </div> );

        let addNewMessage = (messageData: NewMessageFormValuesType) => {
            props.addMessageActionCreator(messageData.newMessageElement);
        }
    return (
        <div className={s.dialogs}>
            <div className ={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit = {addNewMessage}/>
        </div>
    )
}

export default Dialogs

type PropsType = {
    dialogsPage: InitialStateType
    addMessageActionCreator: (message: string) => void
}
export type NewMessageFormValuesType = {
    newMessageElement: string
}
