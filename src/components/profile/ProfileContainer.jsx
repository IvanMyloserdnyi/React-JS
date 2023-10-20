import React from "react"
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";


// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = 30203
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId).then(res => {
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

export default connect(mapStateToProps,actions)(withRouter(ProfileContainer))