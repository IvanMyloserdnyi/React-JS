import React from "react"
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileDataThunk} from "../../redux/profile-reducer";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";


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
        this.props.profileThunkCreator(this.props.router.params.userId)
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


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {profileThunkCreator: getProfileDataThunk}),
    withRouter)
(ProfileContainer)