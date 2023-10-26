import React from "react"
import s from "./ProfileInfo.module.css";




class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    activateEditMode = () =>  {
        console.log(this)
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () =>  {
        this.setState({
            editMode: false
        })
    }
    render() {
    return (
        <div>
            {this.state.editMode === true
                ?
                <div>
                    <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}/>
                </div>
                :
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
            }
        </div>
    )
    }
}
export default ProfileStatus