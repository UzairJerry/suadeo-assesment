// js/models/EmployeeCollection.js
import Employee from './Employee.js';


export default class EmployeeCollection {
    constructor(list = []){
        this.list = list.map(i => new Employee(i));
        this.listeners = [];
    }


    set(items){
        this.list = items.map(i => new Employee(i));
        this._emit();
    }


    add(emp){
        this.list.push(new Employee(emp));
        this._emit();
    }


    filter(predicate){
        return this.list.filter(predicate);
    }


    get uniqueDepartments(){
        const s = new Set(this.list.map(e => e.department));
        return [...s].sort();
    }


    onChange(cb){
        this.listeners.push(cb);
    }


    _emit(){
        this.listeners.forEach(cb=>cb(this.list));
    }
}