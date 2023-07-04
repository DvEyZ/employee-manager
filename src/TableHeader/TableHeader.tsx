import React, { useState } from "react";
import './TableHeader.css'
import { Filter } from "../filters/filters";
import { FilterPickFactory } from "../filters/FilterPick";

export const TableHeader = (props :{
    columnName :string,
    columnType :string,
    displayName :string,
    onSort: (column :string, type :'asc' | 'desc') => any,
    onApplyFilter: (filter :Filter) => any,
}) => {
    const [filterPickOpen, setFilterPickOpen] = useState<boolean>(false);

    const onSortAsc = () => {
        props.onSort(props.columnName, 'asc');
    }

    const onSortDesc = () => {
        props.onSort(props.columnName, 'desc');
    }

    const pickFilter = () => {
        setFilterPickOpen(!filterPickOpen);
    }

    const onFilterPicked = (f :Filter) => {
        props.onApplyFilter(f);
        setFilterPickOpen(false);
    }

    return(
        <div className="table-header">
            <div>
                {props.displayName}
            </div>
            <div>
                <button onClick={() => {onSortDesc()}}>Sortuj rosnąco</button>
                <button onClick={() => {onSortAsc()}}>Sortuj malejąco</button>
                <button onClick={() => {pickFilter()}}>Filtruj</button>
                {
                    filterPickOpen &&
                    <FilterPickFactory field={props.columnName} fieldType={props.columnType} onApply={(f) => {onFilterPicked(f)}} />
                }
            </div>
        </div>
    )
}