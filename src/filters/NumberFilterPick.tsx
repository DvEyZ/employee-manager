import React, { useState } from "react";
import { EqualFilter, Filter, RangeFilter } from "./filters";

export const NumberFilterPick = (props :{
    field :string,
    onApply(filter :Filter) :any
}) => {
    const [filterType, setFilterType] = useState<'equal' | 'range'>('equal');

    const onApply = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);

        let filter = (filterType === 'equal') ?
            new EqualFilter(props.field, Number.parseInt(data.get('equalValue')!.toString()))
        : new RangeFilter(props.field, {
            from: Number.parseInt(data.get('rangeFromValue')!.toString()), 
            to: Number.parseInt(data.get('rangeToValue')!.toString())
        });

        props.onApply(filter);
    };

    return(
        <div className='filter-window'>
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
                        Równe <input type='number' name='equalValue' disabled={filterType !== 'equal'} required/>
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
                        Między <input type='number' name='rangeFromValue' disabled={filterType !== 'range'} required/>
                        <> </>a <input type='number' name='rangeToValue' disabled={filterType !== 'range'} required/>
                    </label>
                </div>
                <input type="submit" value="Zastosuj"/>
            </form>
        </div>
    )
}