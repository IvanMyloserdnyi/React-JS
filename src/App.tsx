import React, {Suspense} from "react"
import './App.css';
import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import {LoginPage} from "./components/login/LoginPage";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {UsersPage} from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeAppThunk} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {compose} from "redux";
import store, {AppStateType} from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeAppThunk: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = () => {
        alert ("some error occured")
    }
    componentDidMount() {
        this.props.initializeAppThunk()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className={"app-wrapper-content"}>
                    <Routes>
                        {/*<Route path="/profile" element={<ProfileContainer/>}/>*/}
                        <Route path="/" element = {<Navigate to="/profile"/>}/>
                        <Route path="/profile"
                               element={<Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
                        <Route path="/profile/:userId"
                               element={<Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
                        <Route path="/dialogs/*"
                               element={<Suspense fallback={<Preloader/>}><DialogsContainer/></Suspense>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/users" element={<UsersPage pageTitle = {'Gussi gangs:'}/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="*" element={<div>404 Not found</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})

const AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeAppThunk}))
(App);

const Main: React.FC = () => {
    return (
        //<BrowserRouter basename={process.env.PUBLIC_URL}>
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}
export default Main