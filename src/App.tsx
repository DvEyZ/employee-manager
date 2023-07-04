import React, { useEffect, useState } from "react"
import './App.css';
import { TableHeader } from "./TableHeader/TableHeader";
import { Employee, TableRow } from "./TableRow/TableRow";
import { Filter } from "./filters/filters";
import { FilterDisplay } from "./filters/FilterDisplay";

const PAGE_SIZE = 5;
const COLUMNS = [
    {
        columnName: 'id',
        columnType: 'number',
        displayName: 'ID'
    },
    {
        columnName: 'firstName',
        columnType: 'string',
        displayName: 'Imię'
    },
    {
        columnName: 'lastName',
        columnType: 'string',
        displayName: 'Nazwisko'
    },
    {
        columnName: 'dateOfBirth',
        columnType: 'date',
        displayName: 'Data urodzenia'
    },
    {
        columnName: 'function',
        columnType: 'string',
        displayName: 'Funkcja'
    },
    {
        columnName: 'experience',
        columnType: 'number',
        displayName: 'Doświadczenie'
    }
];

export const App = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [displayedEmployees, setDisplayedEmployees] = useState<Employee[]>([]);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        fetch('/sluzba.json').then((res) => res.json()).then((v) => {
            let emps = v.map((employee :any) => {
                let [date, _] = employee.dateOfBirth.split(' ');
                let [day, month, year] = date.split('.');

                return {
                    ...employee,
                    dateOfBirth: new Date(year, month - 1, day)
                }
            });
            setEmployees(emps);
            setDisplayedEmployees(emps);
            setLoaded(true);
        })
    }, [])

    const sort = (column :string, type :'asc' | 'desc') => {
        let sorted = [...displayedEmployees].sort((a :any,b :any) => 
            a[column] === b[column] ? 
                a.id > b.id ? -1 : 1
            : (a[column] > b[column] ? -1 : 1)
        );
        if(type === 'desc') sorted.reverse();
        setDisplayedEmployees(sorted);
        setPage(1);
    }

    const addFilter = (filter :Filter) => {
        setFilters([
            ...filters, 
            filter
        ]);
        setPage(1);
    }

    const removeFilter = (index :number) => {
        setFilters(filters.filter((v,i) => i !== index));
        setPage(1);
    };

    const previousPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    if(!loaded) return <>Loading...</>

    let emps = displayedEmployees.filter((v) => 
        filters.every((f) => f.match(v))
    )

    return (
        <div className='app'>
            <div className='table-cols'>
                {
                    COLUMNS.map((v,i) => 
                        <TableHeader
                            key={i}
                            columnName={v.columnName}
                            columnType={v.columnType}
                            displayName={v.displayName}
                            onApplyFilter={(filter) => {addFilter(filter)}}
                            onSort={(v,t) => {sort(v,t)}}
                        />
                    )
                }
            </div>
            <div className='filters'>
                {
                    COLUMNS.map((col, i) => 
                        <div className='filter-column'>
                            {
                                filters.filter((v) => v.getFieldName() === col.columnName).map((f, i) => 
                                    <FilterDisplay key={i} text={f.getDisplayString()} onRemove={() => {removeFilter(i)}}/>
                                )
                            }
                        </div>
                    )
                }
            </div>
            <div className='table-content'>
                {
                    
                    emps.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((v,i) => 
                        <TableRow key={i} employee={v}/>
                    )
                }
            </div>
            <div className='page-button-container'>
                <button 
                    onClick={() => {previousPage()}}
                    disabled={page === 1}
                >
                    Poprzednia strona
                </button>
                <div className="page-counter">
                    <input type='number' className='page-number' min={1} max={Math.ceil(emps.length / PAGE_SIZE)}
                    value={page} onChange={(v) => {setPage(Number.parseInt(v.currentTarget.value))}}/>
                    <div className="big">/</div>
                    <div className="page-number">{Math.ceil(emps.length / PAGE_SIZE)}</div>
                </div>
                <button 
                    onClick={() => {nextPage()}}
                    disabled={emps.length <= page * PAGE_SIZE}
                >
                    Następna strona
                </button>
            </div>
        </div>
    )
}