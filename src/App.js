import React from "react"
import './App.css';
import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import LoginPage from "./components/login/Login";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {initializeAppThunk} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {compose} from "redux";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeAppThunk()
    }
    render() {
        if(!this.props.initialized) { return <Preloader/> }
        return (
             <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className={"app-wrapper-content"}>
                        <Routes>
                            <Route path="/profile" element={<ProfileContainer/>}/>
                            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                        </Routes>
                    </div>
                </div>
             </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({ initialized: state.app.initialized })

export default compose(
    connect(mapStateToProps,{initializeAppThunk}))
    (App);
