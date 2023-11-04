import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import messageReducer from "./message-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

let store = legacy_createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store

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
