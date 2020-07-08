import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    userService = new UserService();

    componentDidMount() {
        this.userService.checkLogin().then(
            (resp) => {
                console.log(resp)
                this.props.dispatch( { type: 'login', user: resp.data })
            }
        )
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.login(e);
        }
    }

    login(e) {
        e.preventDefault()
        console.log(this.props)
        this.userService.login(this.props.username).then(
            (resp) => {
                this.props.dispatch( { type: 'login', user: resp.data })
            }
        )
    }

    logout(e){
        e.preventDefault()
        this.userService.logout().then(
            () => {
                console.log('Logging out.')
                this.props.dispatch( { type: 'login', user: null} )
            }
        )
    }

    handleInput(e) {
        console.log(this.props)
        this.props.dispatch( { type: 'handleUsername', username: e.target.value } )
    }

    getLoginForm() {
        return (
            <div>
                <form class="form-row align-items-right" onSubmit={this.login}>
                    <div class="col-auto">
                        <input type="text"
                            value={this.props.username}
                            onChange={this.handleInput}
                            placeholder="Username"
                            onKeyDown={ (e) => this.handleKeyDown(e) }></input>
                    </div>
                    <div class="col-auto">
                        <input type="text"
                            value={this.props.password}
                            onChange={this.handleInput}
                            placeholder="Password"
                            onKeyDown={ (e) => this.handleKeyDown(e) }></input>
                    </div>
                    <div class="col-auto">
                        <button
                            class="form-control"
                            onClick={ this.login}>Login</button>
                    </div>
                </form>
            </div>
        )
    }

    displayUser() {
        return (
            <div>
                <div className = 'nav'>
                    <div className = 'nav-item'>
                        Welcome{this.props.user.role}: {this.props.user.username}
                    </div>
                    <div className = 'nav-item'>
                        <button onClick={ this.logout }>Logout</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        console.log('rendering login')
        if (this.props.user) {
            return this.displayUser()
        } else {
            return this.getLoginForm()
        }
    }
}

function mapStateToProps(state) {
    const {user, username} = state;
    return {user: user,
            username: username}
}

export default connect(mapStateToProps)(Login);