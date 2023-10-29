import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./dialogitem/DialogItem";
import Message from "./message/Message";
import {Field, reduxForm} from "redux-form";


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

        let addNewMessage = (messageData) => {
            props.addMessage(messageData.newMessageElement);
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
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name = 'newMessageElement' placeholder='Enter your message' component='textarea'/>
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMassageForm'})(AddMessageForm)
export default Dialogs