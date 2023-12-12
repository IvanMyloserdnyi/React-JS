import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
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

//composeEnhancers works only with chrome
/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true, traceLimit:25}) || compose;*/
const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : compose;
let store = legacy_createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

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
