import React, { Component } from 'react';
import UserService from '../services/user.service'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

function RegisterButton() {
    const history = useHistory();

    function handleClick() {
        history.push('/register')
    }

    return (
        <>
            <button className="form-control" onClick={ handleClick }>Register</button>
        </>
    )
}

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
        this.userService.login(this.props.username, this.props.password).then(
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
                this.props.dispatch( { type: 'handlePassword', password: null} )
                this.props.dispatch( { type: 'handleUsername', username: null} )
            }
        )
    }

    handleInput(e) {
        console.log(this.props)
        switch (e.target.name) {
            case 'password':
                this.props.dispatch( { type: 'handlePassword', password: e.target.value } )
                break;
            case 'username': 
                this.props.dispatch( { type: 'handleUsername', username: e.target.value } )
                break;
        }
        
    }

    getLoginForm() {
        return (
            <div>
                <form className="form-row align-items-right" onSubmit={this.login}>
                    <div className="col-auto">
                        <input type="text"
                            id='username'
                            value={this.props.username}
                            onChange={this.handleInput}
                            name="username"
                            placeholder="Username"
                            onKeyDown={ (e) => this.handleKeyDown(e) }></input>
                    </div>
                    <div className="col-auto">
                        <input type="password"
                            value={this.props.password}
                            onChange={this.handleInput}
                            name="password"
                            placeholder="Password"
                            onKeyDown={ (e) => this.handleKeyDown(e) }></input>
                    </div>
                    <div className="col-auto">
                        <button
                            className="form-control"
                            onClick={ this.login } id='login'>Login</button>
                    </div>
                    <div className="col-auto">
                        <RegisterButton />
                    </div>
                </form>
            </div>
        )
    }

    displayUser() {
        return (
            <div>
                <div className = 'nav'>
                    <div className = 'nav-item' id='userDisplay'>
                        Welcome {this.props.user.role}: {this.props.user.username}
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
    const {user, username, password} = state;
    return {user: user,
            username: username,
            password: password }
}

export default connect(mapStateToProps)(Login);