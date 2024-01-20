import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {JSX} from "react/jsx-dev-runtime";




let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}
function withAuthRedirect<WrappedComponentProps extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WrappedComponentProps>
) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if(!props.isAuth) return <Navigate to='/login'/>
        return <WrappedComponent {...restProps as WrappedComponentProps}/>
    }
    return  connect<MapPropsType,DispatchPropsType,WrappedComponentProps,AppStateType>(mapStateToPropsForRedirect,{})(RedirectComponent)
}
export default withAuthRedirect