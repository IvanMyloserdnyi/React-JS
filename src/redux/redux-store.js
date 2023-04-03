import {combineReducers, legacy_createStore, legacy_createStore as createStore} from "redux";
import messageReducer from "./message-reducer";
import profileReducer from "./profile-reducer";

let reducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:messageReducer
})

let store = legacy_createStore(reducers);

export default store;

/*
const rootReducer = combineReducers({
    profileReducer: profileReducer,
    messagesReducer: messagesReducer,
})

затем мы начинаем использовать данный синтаксис для создания store -
export const store = configureStore({
    reducer: rootReducer
})*/
/*
?????????????????????????*/
