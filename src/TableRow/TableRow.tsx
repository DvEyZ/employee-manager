import React from "react"
import './TableRow.css'

export interface Employee {
    [key :string] :any,

    id :number,
    firstName :string,
    lastName :string,
    dateOfBirth :Date,
    function :string,
    experience :number
}


export const TableRow = (props :{
    employee :Employee
}) => {
    return(
        <div className="table-row">
            <div className="table-field">{props.employee.id}</div>
            <div className="table-field">{props.employee.firstName}</div>
            <div className="table-field">{props.employee.lastName}</div>
            <div className="table-field">{props.employee.dateOfBirth.toLocaleDateString()}</div>
            <div className="table-field">{props.employee.function}</div>
            <div className="table-field">{props.employee.experience}</div>
        </div>
    )
}