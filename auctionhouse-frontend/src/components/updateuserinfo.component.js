import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';


class UpdateUserInfo extends Component {
    userService = new UserService();
    constructor(props) {
        super(props)
        this.currentUserSearch = this.currentUserSearch.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
        this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }
    
    currentUserSearch(e){
        let infoObject = Object.assign({}, this.props.user);
        const value = e.target.value.replace(/[^\d]/,'');
        infoObject['_id'] = parseInt(value);
        this.props.dispatch({type: 'handleUserFieldChange', user: infoObject})
        console.log('User', this.props.user)
    }    
    handleUsernameUpdate(e){
        let infoObject = Object.assign({}, this.props.user);
        const value = e.target.value.replace(/[^\d]/,'');
        infoObject['username'] = (value);
        this.props.dispatch({type: 'handleUserFieldChange', user: infoObject})
        console.log('User:', this.props.user)
    }
    handlePasswordUpdate(e){
        let infoObject = Object.assign({}, this.props.user);
        const value = e.target.value.replace(/[^\d]/,'');
        infoObject['password'] = (value);
        this.props.dispatch({type: 'handleUserFieldChange', user: infoObject})
        console.log('User:', this.props.user)
    }
    updateUserInfo(e){
        e.preventDefault()
        console.log("In handle update user")
        let infoObject = {_id: e.target.name, user: e.target.name, password: e.target.name}
        this.userService.updateUserInfo(infoObject).then(
            (resp) => {
                this.props.dispatch({type: 'updateUserInfo', user: {}})
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
                            <h5>Account ID:</h5>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" name='Id' onChange={this.currentUserSearch}/>
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