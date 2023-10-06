import React from "react";
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {
    return <StoreContext.Consumer>
        {
            (store) => {
                let state = store.getState().dialogsPage;
                let addMessage = () => {
                    store.dispatch(addMessageActionCreator());
                }
                let updateNewMessageText = (text) => {
                    let message_action = store.dispatch(updateNewMessageTextActionCreator(text));
                    store.dispatch(message_action)
                }
                return <Dialogs updateNewMessageText={updateNewMessageText}
                                addMessage={addMessage}
                                dialogsPage={state}/>
            }
        }
    </StoreContext.Consumer>
}
export default DialogsContainer