import React, {ChangeEvent} from "react"


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}
class ProfileStatus extends React.Component<PropsType, StateType> {
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
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
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