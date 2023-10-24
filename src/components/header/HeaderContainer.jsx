import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthDataThunk} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authThunkCreator()
    }
    render() {
        return <Header {...this.props}/>
    }
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {authThunkCreator: getAuthDataThunk})(HeaderContainer)