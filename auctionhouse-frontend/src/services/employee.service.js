const { default: axios } = require('axios');

class EmployeeService{
    constructor(){
        this.URI = 'http://localhost:5000/employee';
    }

    addEmployee(employee){
        console.log(employee)
        return axios.post(this.URI, employee, {withCredentials: true})
    }
}

export default EmployeeService;