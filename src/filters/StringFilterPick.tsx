import React, { useState } from "react";
import { EqualFilter, Filter, MatchRegexFilter } from "./filters";

export const StringFilterPick = (props :{
    field :string,
    onApply(filter :Filter) :any
}) => {
    const [filterType, setFilterType] = useState<'equal' | 'regex'>('equal');

    const onApply = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);

        let filter = (filterType === 'equal') ?
            new EqualFilter(props.field, data.get('equalValue')!.toString())
        : new MatchRegexFilter(props.field, RegExp(data.get('regexValue')!.toString()))

        props.onApply(filter);
    }

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
                        Równe <input type='text' name='equalValue' disabled={filterType !== 'equal'} required/>
                    </label>
                </div>
                <div>
                    <input 
                        id='regex-radio' 
                        type='radio' 
                        name='filterType' 
                        value='regex' 
                        checked={filterType === 'regex'} 
                        onChange={() => {setFilterType('regex')}}
                    />
                    <label htmlFor='equal-radio'>
                        Spełnia wyrażenie regularne <input type='text' name='regexValue' disabled={filterType !== 'regex'} required/>
                    </label>
                </div>
                <input type="submit" value="Zastosuj"/>
            </form>
        </div>
    )
};