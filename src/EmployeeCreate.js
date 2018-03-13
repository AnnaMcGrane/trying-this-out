import React, {Component} from 'react'

class EmployeeCreate extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            managerId: ''
        }
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeManager = this.onChangeManager.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    onSave(ev){
        ev.preventDefault();
        //prevent reload
        this.props.onCreate({
            name: this.state.name,
            managerId: this.state.managerId
        })
    }
    onChangeManager(ev){
        this.setState({ managerId: ev.target.value})
    }
    onChangeName(ev){
        this.setState({ name: ev.target.value });
    }
    //target is the thing you put the onChange on
    render() {
        const { name, managerId } = this.state
        const { onChangeName, onChangeManager, onSave } = this
        const { employees } = this.props
        return (
            <form onSubmit = {onSave} >
                <input value={ name } onChange= {onChangeName} />
                
                <select value = { managerId} onChange = { onChangeManager } >
                    <option value=''>none </option>
                    {
                        employees.map (employee => {
                            return (
                                <option key= {employee.id} value = {employee.id} > {employee.name} </option>
                            )
                        })
                    }
                </select>
                <button disabled={ name.length === 0 }>Create</button>
            </form>
        )
    }
}

export default EmployeeCreate;
