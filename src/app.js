import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { HashRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Employees from './Employees'
import EmployeeCreate from './EmployeeCreate'

class App extends Component {
    constructor(){
        super();
        this.state = {
            employees: [],
            managers: []
        }
        this.onCreate = this.onCreate.bind(this)
    }
    componentDidMount(){
        axios.get('/api/employees')
            .then( result => result.data)
            .then( employees =>{ 
                const managerMap = employees.reduce((memo, employee) => {
                    if(employee.manager){ 
                        memo[employee.manager.id] = employee.manager;
                    }
                    return memo;
                }, {});
                const managers = Object.keys(managerMap).map(key => managerMap[key])
                this.setState({managers, employees})
            }
            )
    }
    onCreate(employee){
        axios.post('/api/employees', employee)
            .then(result => result.data)
            .then (employee => {
                const employees = [... this.state.employees, employee]
                this.setState({ employees })
            })
    }
    render(){
       const { employees, managers } = this.state
       const { onCreate } = this
       return (
        <Router>
            <div>
                <Route render = { ({ location })=> <Nav employeeCount = {employees.length} managerCount = { managers.length} managers = { managers } employees = {employees} path= { location.pathname }/> } />
                <Route path ='/' exact render = {()=> <Employees employees = { employees } />} />   
                <Route path = '/employees/create' exact render = {()=> <EmployeeCreate employees = { employees } onCreate ={ onCreate} />} />
            </div>
        </Router>
       )
    }
}

export default App;

//this was designed this way to minimize the number of SmartComponents