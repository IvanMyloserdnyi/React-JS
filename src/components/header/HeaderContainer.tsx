import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return <Header {...this.props}/>
    }
}
const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logoutThunkCreator})(HeaderContainer)

export type HeaderPropsType = MapStatePropsType & DispatchPropsType
type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type DispatchPropsType = {
    logoutThunkCreator: () => void
}