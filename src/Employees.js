import React from 'react'

const Employees = ({ employees }) => {
    return (
        <ul>
            { employees.map ( employee => {
                return (
                    <li key = { employee.id }> { employee.name } </li>
                )
            })}
        </ul>
    )
}

export default Employees