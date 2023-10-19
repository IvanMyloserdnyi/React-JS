import React from "react"
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(res => {
            this.props.setUserProfile(res.data)
        })
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
    profile: state.profilePage.profile
})
const actions = {setUserProfile}
export default connect(mapStateToProps,actions)(ProfileContainer)