
import React from "react";
import Dialogs from "./Dialogs";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {actions} from "../../redux/message-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
/*let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessage) => {
            dispatch(actions.addMessageActionCreator(newMessage));
        }
    }
}*/


export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {...actions}))
(Dialogs)