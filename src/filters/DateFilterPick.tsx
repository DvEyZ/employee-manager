import React, { useState } from "react";
import { DateEqualFilter, DateRangeFilter, EqualFilter, Filter } from "./filters";

export const DateFilterPick = (props :{
    field :string,
    onApply(filter :Filter) :any
}) => {
    const [filterType, setFilterType] = useState<'equal' | 'range'>('equal');

    const onApply = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);

        let filter = (filterType === 'equal') ?
            new DateEqualFilter(props.field, new Date(data.get('equalValue')!.toString()))
        : new DateRangeFilter(props.field, {
            from: new Date(data.get('rangeFromValue')!.toString()), 
            to: new Date(data.get('rangeToValue')!.toString())
        });

        props.onApply(filter);
    };

    return(
        <div className="filter-window">
            <form onSubmit={(e) => {onApply(e)}}>
                <div>
                    <input 
                        id='equal-radio' 
                        type='radio' 
                        name='filterType' 
                        value='equal' 
                        checked={filterType === 'equal'} 
                        onChange={() => {setFilterType('equal')}}
                    />
                    <label htmlFor='equal-radio'>
                        Równe <input type='date' name='equalValue' disabled={filterType !== 'equal'} required/>
                    </label>
                </div>
                <div>
                    <input 
                        id='range-radio' 
                        type='radio' 
                        name='filterType' 
                        value='range' 
                        checked={filterType === 'range'} 
                        onChange={() => {setFilterType('range')}}
                    />
                    <label htmlFor='equal-radio'>
                        Między <input type='date' name='rangeFromValue' disabled={filterType !== 'range'} required/>
                        <> </>a <input type='date' name='rangeToValue' disabled={filterType !== 'range'} required/>
                    </label>
                </div>
                <input type="submit" value="Zastosuj" />
            </form>
        </div>
    )
}