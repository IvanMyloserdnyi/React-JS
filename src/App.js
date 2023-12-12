import React, {Suspense} from "react"
import './App.css';
import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import LoginPage from "./components/login/Login";
import {Routes, Route, HashRouter} from "react-router-dom";
import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect, Provider} from "react-redux";
import {initializeAppThunk} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {compose} from "redux";
import store from "./redux/redux-store";
//import DialogsContainer from "./components/dialogs/DialogsContainer";
//import ProfileContainer from "./components/profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeAppThunk()
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
                        <Route path="/profile"
                               element={<Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
                        <Route path="/profile/:userId"
                               element={<Suspense fallback={<Preloader/>}><ProfileContainer/></Suspense>}/>
                        <Route path="/dialogs/*"
                               element={<Suspense fallback={<Preloader/>}><DialogsContainer/></Suspense>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({initialized: state.app.initialized})

const AppContainer = compose(
    connect(mapStateToProps, {initializeAppThunk}))
(App);

const Main = (props) => {
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