import { Employee } from "../TableRow/TableRow"

export interface Filter {
    getFieldName() :string,
    getDisplayString() :string,
    match(value :Employee) :boolean
}

export class EqualFilter implements Filter {
    constructor(protected field :string, protected value :any) {}

    getFieldName(): string {
        return this.field;
    }

    getDisplayString(): string {
        return `Równe "${this.value}"`
    }

    match(value: Employee): boolean {
        return value[this.field] === this.value
    }
}

export class DateEqualFilter extends EqualFilter {
    getDisplayString(): string {
        return `Równe ${this.value.toLocaleDateString()}`
    }

    match(value: Employee): boolean {
        return value[this.field].getDate() === this.value.getDate();
    }
}

export class MatchRegexFilter implements Filter {
    constructor(private field :string, private regex :RegExp) {}

    getFieldName(): string {
        return this.field;
    }

    getDisplayString(): string {
        return `Spełnia wyrażenie regularne ${this.regex}`
    }

    match(value: Employee): boolean {
        let f = value[this.field];
        if(typeof f != 'string') {
            throw new Error('This filter can be used only on string fields.')
        } 
        return this.regex.test(f);
    }
}

export class RangeFilter implements Filter {
    constructor(private field :string, private range :{
        from :number, to :number
    }) {}

    getFieldName(): string {
        return this.field;
    }

    getDisplayString(): string {
        return `Między ${this.range.from} a ${this.range.to}`
    }

    match(value: Employee): boolean {
        let f = value[this.field];
        if(typeof f != 'number') {
            throw new Error('This filter can be used only on number fields.')
        }
        return (f >= this.range.from) && (f <= this.range.to)
    }
}

export class DateRangeFilter implements Filter {
    constructor(private field :string, private range :{
        from :Date, to :Date
    }) {};

    getFieldName(): string {
        return this.field;
    }

    getDisplayString(): string {
        return `Między ${this.range.from.toLocaleDateString()} a ${this.range.to.toLocaleDateString()}`
    }

    match(value: Employee): boolean {
        let f = value[this.field];
        if(!(f instanceof Date)) {
            throw new Error('This filter can be used only on date fields.')
        }

        return (f >= this.range.from) && (f <= this.range.to)
    }
}