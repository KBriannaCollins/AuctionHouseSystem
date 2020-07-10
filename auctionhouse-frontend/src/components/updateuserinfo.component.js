import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';


class UpdateUserInfo extends Component {
    userService = new UserService();
    constructor(props) {
        super(props)
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
        this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }
    
    currentUserSearch(e){
        let currentUsername = Object.assign({}, this.props.user.username);
        currentUsername[e.target.name] = e.target.value;
        this.props.dispatch({type: 'currentUserSearch', user: currentUsername})
        console.log('Current Username:', this.props.user.username)
    }    
    handleUsernameUpdate(e){
        let newUsername = Object.assign({}, this.props.user.username);
        newUsername[e.target.name] = e.target.value;
        this.props.dispatch({type: 'handleUsernameUpdate', username: newUsername})
        console.log('Username:', this.props.user.username)
    }
    handlePasswordUpdate(e){
        let newPassword = Object.assign({}, this.props.user.password);
        newPassword[e.target.name] = e.target.value;
        this.props.dispatch({type: 'handlePasswordUpdate', password: newPassword})
        console.log('Password:', this.props.user.password)
    }
    updateUserInfo(e){
        e.preventDefault()
        console.log("In handle update user")
        let currentUsername = {user: currentUsername}
        let newUsername = {username: newUsername}
        let newPassword = {password: newPassword}
        this.productService.updateUser(currentUsername, newUsername, newPassword).then(
            (resp) => {
                this.props.dispatch({type: 'updatUserInfo', user: {}})
            }
        )
    }
        
    render(){
        // const FIELDS = ['name', 'description', 'start_bid']
        return( 
            <div class="form-group w-50">
                <form>
                    <div class="row">
                        <div class="col"></div>
                        <div class="col">
                            <h3 class="form-group">Update User Information</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h5>Current Username:</h5>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" name='username' onChange={this.currentUserSearch}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col"><h5>New Username:</h5></div>
                        <div class="col">
                            <input class="form-control" name='username' onChange={this.handleUsernameUpdate}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col"><h5>New Password:</h5></div>
                        <div class="col">
                            <input class="form-control" name='password' onChange={this.handlePasswordUpdate}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col"></div>
                        <div class="col">
                        <button class="form-control" onClick={(e) => this.updateUserInfo(e)}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { user } = state;
    return { user: user }
}

export default connect(mapStateToProps)(UpdateUserInfo)