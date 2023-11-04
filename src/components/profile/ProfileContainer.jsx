import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileDataThunk, getUserStatusThunk, updateUserStatusThunk} from "../../redux/profile-reducer";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import withRouter from "../../utils/oldHOC/withRouter";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getProfileDataThunk(userId)
        this.props.getUserStatusThunk(userId)
    }
    render() {
        return (
            <div>
                <Profile {...this.props}/>
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
    connect(mapStateToProps, {getProfileDataThunk,getUserStatusThunk,updateUserStatusThunk}),
    withRouter)
(ProfileContainer)