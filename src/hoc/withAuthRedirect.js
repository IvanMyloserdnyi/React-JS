import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})
const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to = '/login'/>
        return <Component {...props}/>
    }



    return  connect(mapStateToPropsForRedirect)(RedirectComponent)
}
export default withAuthRedirect