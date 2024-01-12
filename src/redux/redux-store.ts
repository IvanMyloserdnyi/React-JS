import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import messageReducer from "./message-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesType<T>>
export type AppStateType = ReturnType<RootReducerType>
//composeEnhancers works only with chrome
/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true, traceLimit:25}) || compose;*/
/*const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : compose;*/
const composeEnhancers: any =
    (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : compose
let store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.store = store

export default store

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
