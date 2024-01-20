import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileDataThunk,
    getUserStatusThunk,
    savePhoto,
    saveProfile,
    updateUserStatusThunk
} from "../../redux/profile-reducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import withRouter from "../../utils/oldHOC/withRouter";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";
import {NavigateFunction} from "react-router-dom";


class ProfileContainer extends React.Component<PropsType> {

/*    constructor(props: PropsType) {
        debugger
        super(props);
    }*/
    refreshProfile() {
        // @ts-ignore
        let userId: number | null  = +this.props.router.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        if (!userId) {
            console.error('User id should exists in URI params or in the state')
        }
        else {
            this.props.getProfileDataThunk(userId)
            this.props.getUserStatusThunk(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile profile = {this.props.profile}
                         status = {this.props.status}
                         updateUserStatus = {this.props.updateUserStatusThunk}
                         isOwner = {!this.props.router.params.userId}
                         savePhoto = {this.props.savePhoto}
                         saveProfile = {this.props.saveProfile}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})


export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getProfileDataThunk,getUserStatusThunk,updateUserStatusThunk,savePhoto,saveProfile}),
    withRouter)
(ProfileContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getProfileDataThunk: (userId: number) => void
    getUserStatusThunk: (userId: number) => void
    updateUserStatusThunk: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PropsType = MapPropsType & DispatchPropsType & withRouterProps
type withRouterProps = {
    router: {
        location: Location
        navigate: NavigateFunction
        params: Record<"userId", string | undefined>
    };
}