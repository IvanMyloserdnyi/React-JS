import React from "react"




class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () =>  {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () =>  {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.status !== this.props.status) {
        this.setState({
            status: this.props.status})
    }
    }

    render() {
    return (
        <div>
            {this.state.editMode === true
                ?
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                </div>
                :
                <div onDoubleClick={this.activateEditMode}>
                    <p>Your status:</p>
                    <span >{this.props.status || '---------'}</span>
                </div>
            }
        </div>
    )
    }
}
export default ProfileStatus