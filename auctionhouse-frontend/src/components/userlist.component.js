import React, { Component } from 'react';
import UserService from '../services/user.service'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

function UserTable(props) {

    let identity = props.userInfo._id
    let username = props.userInfo.username
    let role = null
    if ('role' in props.userInfo){
        role = props.userInfo.role.toLowerCase()
        role = role.charAt(0).toUpperCase() + role.slice(1)
    } else {
        role = 'Bidder'
    }

    function handleClick(e) {
        console.log('Sending request to remove user: ', e.target.name)
        props.userService.removeUser(e.target.name).then(resp =>
            {
                if (resp.status === 200)
                    alert("Successfully deleted the user.")
            }
        ).catch(e =>{
            console.error(e)
            alert("Could not delete the user.\nIf it is the manager, it cannot be deleted.")
        }
           
        )
    }

    return(
        <tr>
            <td>{identity}</td>
            <td>{username}</td>
            <td>{role}</td>
            <td><Button className='button' name={identity} onClick={handleClick}>Delete User</Button></td>
        </tr>
    )
}


class UserList extends Component {
    
    userService = new UserService()

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.userService.getUsers().then(resp => {
            console.log(resp.data.userList)
            this.props.dispatch({type: 'loadUserList', userList: resp.data.userList})
        })
    }

    fullUserList(users) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return <UserTable key={user._id} userService={this.userService} userInfo={user}/>
                        })
                    }
                </tbody>
            </Table>
        )
    }

    render() {
        console.log(this.props.userList)
        if(this.props.userList && this.props.userList.length !== 0) {
            return (this.fullUserList(this.props.userList));
        }
        else if (this.props.userList && this.props.userList.length === 0) {
            return(
                <>
                    <h1>There are no users. How are you reading this?</h1>
                </>
            )
        }
        else {
            return(
                <>
                    <h1>Loading...</h1>
                </>
            )
        }
    }
}

function mapStateToProps(state) {
    const { userList } = state;
    return { userList: userList }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: (list) => dispatch({type: 'loadUserList', userList: list}),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)