import React from "react"
import './FilterDisplay.css';

export const FilterDisplay = (props :{
    text :string,
    onRemove() :any,
}) => {
    return(
        <button className='filter' onClick={() => {props.onRemove()}}>
            ❌ {props.text}
        </button>
    )
}