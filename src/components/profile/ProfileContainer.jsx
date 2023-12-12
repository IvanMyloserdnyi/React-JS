import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileDataThunk, getUserStatusThunk, savePhoto, updateUserStatusThunk} from "../../redux/profile-reducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import withRouter from "../../utils/oldHOC/withRouter";


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getProfileDataThunk(userId)
        this.props.getUserStatusThunk(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
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
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getProfileDataThunk,getUserStatusThunk,updateUserStatusThunk,savePhoto}),
    withRouter)
(ProfileContainer)