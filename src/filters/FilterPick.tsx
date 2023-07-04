import React from "react"
import { Filter } from "./filters"
import { NumberFilterPick } from "./NumberFilterPick"
import './FilterPick.css'
import { StringFilterPick } from "./StringFilterPick"
import { DateFilterPick } from "./DateFilterPick"

export const FilterPickFactory = (props: {
    field :string,
    fieldType :string,
    onApply(filter :Filter) :any
}) => {
    if(props.fieldType === 'number') {
        return <NumberFilterPick field={props.field} onApply={(filter) => {props.onApply(filter)}}/>;
    }
    else if(props.fieldType === 'string') {
        return <StringFilterPick field={props.field} onApply={(filter) => {props.onApply(filter)}}/>;
    }
    else if(props.fieldType === 'date') {
        return <DateFilterPick field={props.field} onApply={(filter) => {props.onApply(filter)}}/>;
    }
    throw new Error('Invalid field type.');
}