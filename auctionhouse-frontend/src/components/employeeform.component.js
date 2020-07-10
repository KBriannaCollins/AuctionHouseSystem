import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeService from '../services/employee.service';

class EmployeeForm extends Component{

    employeeService = new EmployeeService();

    constructor(props){
        super(props);
        this.handleEmpUsernameChange = this.handleEmpUsernameChange.bind(this);
        this.handleEmpPasswordChange = this.handleEmpPasswordChange.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmpUsernameChange(e){
        let newEmployee = Object.assign({}, this.props.employee);
        newEmployee.username = e.target.value;
        this.props.dispatch({type: 'handleEmpUsernameChange',employee: newEmployee})
        console.log('Username:', this.props.employee)
    }
    handleEmpPasswordChange(e){
        let newEmployee = Object.assign({}, this.props.employee);
        newEmployee.password = e.target.value;
        this.props.dispatch({type: 'handleEmpPasswordChange', employee: newEmployee})
        console.log(this.props.employee)
    }
    handleRole(e){
        let newEmployee = Object.assign({}, this.props.employee);
        newEmployee.role = e.target.value;
        this.props.dispatch({type: 'handleRole', employee: newEmployee})
        console.log(this.props.employee)
    }
    handleSubmit(e){
        e.preventDefault()
        this.employeeService.addEmployee(this.props.employee).then(
            (resp) => {
                this.props.dispatch({type: 'addEmployee', employee: {'username': '', 'password': '', 'role': ''}})
                if (resp.status === 201){
                    alert("Successfully created employee.")
                } else {
                    alert("Could not create employee.")
                }
            }
        )
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}><p></p>
                <p><label>Enter the employee username:</label></p>
                <p><input type="text"  onChange={this.handleEmpUsernameChange}/></p>
                <p><label>Enter the employee password:</label></p>
                <p><input type="text" onChange={this.handleEmpPasswordChange}/></p>
                <p><label>Select the type of employee:</label></p>
                <p><select name="Role" id="Role" onClick={this.handleRole}>
                    <option value ="Curator">Curator</option>
                    <option value ="Auctioneer">Auctioneer</option>
                    </select></p>
                <p><input type="submit" value="Submit" onClick={this.handleSubmit}/></p>
            </form>
        );
    }
}

function mapStateToProps(state){
    const { employee } = state;
    return { employee: employee }
}

export default connect(mapStateToProps)(EmployeeForm);

