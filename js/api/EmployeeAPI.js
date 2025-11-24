// js/api/EmployeeAPI.js
export default class EmployeeAPI {
    constructor(baseUrl = ''){
        this.baseUrl = baseUrl;
    }


    async fetchEmployees(){
        const res = await fetch(`${this.baseUrl}/users`);
        if(!res.ok) throw new Error('Failed to fetch employees');
        const data = await res.json();
// map jsonplaceholder user -> employee shape
        return data.map(u => ({
            id: u.id,
            name: u.name,
            username: u.username,
            email: u.email,
            phone: u.phone,
            role: u.company?.bs ? u.company.bs.split(' ')[0] : 'Staff',
            department: u.company?.name || 'General',
            company: u.company?.name || '',
            city: u.address?.city || '',
            street: u.address?.street || ''
        }));
    }
}