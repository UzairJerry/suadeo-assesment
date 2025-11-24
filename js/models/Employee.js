// js/models/Employee.js
export default class Employee {
    constructor({id,name,username,email,phone,role,department,company,city,street}){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.department = department;
        this.company = company;
        this.city = city;
        this.street = street;
    }
}