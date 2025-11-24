// js/services/DataService.js
import EmployeeAPI from '../api/EmployeeAPI.js';
import EmployeeCollection from '../models/EmployeeCollection.js';


export default class DataService {
    constructor(){
        this.api = new EmployeeAPI();
        this.collection = new EmployeeCollection();
    }


    async load(){
        const data = await this.api.fetchEmployees();
        this.collection.set(data);
        return this.collection;
    }


// filter by search text and departments array
    applyFilters({text = '', departments = []}){
        const t = text.trim().toLowerCase();
        const filtered = this.collection.list.filter(e => {
            const matchDept = departments.length === 0 || departments.includes(e.department);
            const matchText = !t || [e.name,e.email,e.role,e.company,e.city].some(v => (v||'').toLowerCase().includes(t));
            return matchDept && matchText;
        });
        return filtered;
    }
}