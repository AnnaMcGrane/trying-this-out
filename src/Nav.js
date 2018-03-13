import React from 'react'
import {Link} from 'react-router-dom'

const Nav = ( {employeeCount, managerCount, managers, employees, path})=> {
    return(
    <ul>
        <li>
        {
            path === '/employees' ? (
                <span> Employees {employeeCount} </span>
            ) : (
                <Link to= '/employees'>Employees {employeeCount} </Link>
            )
        }
        </li>
        <li>
        {
            path === '/managers' ? (
                <span>Managers {managerCount} </span>
            ) : (
                <Link to= '/managers'>Managers{managerCount} </Link>
            )
        }
        </li>
        <li>
        {
            path === '/employees/create' ? (
                <span>Create an Employee </span>
            ) : (
                <Link to= '/employees/create'>Create An Employee</Link>
            )
        }
        </li>
        <br/>
        <h3> Managers </h3>
            { managers.map ( manager => {
            return (
                <li key = { manager.id }> { manager.name } </li>
            )
            })}
    </ul>
    )
}

export default Nav

//What's on a Nav?
//you take in data from APP (App uses axios to pull data)
//then you display in a UL/LI/path === '/name