
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            let message_action = dispatch(updateNewMessageTextActionCreator(text));
            dispatch(message_action)
        },
        addMessage: () => {
            dispatch(addMessageActionCreator());
        }
    }
}
const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)
export default DialogsContainer