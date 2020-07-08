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
            <div className="text-center">
                <form className="form-group" onSubmit={this.login}>
                <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <h3 className="form-group">Login</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <h5 className="small_h5">Username:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <input type="text"
                                value={this.props.username}
                                onChange={this.handleInput}
                                onKeyDown={ (e) => this.handleKeyDown(e) }></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <button
                                className="form-control"
                                onClick={ this.login}>Login</button></div>
                    </div>
                </form>
            </div>
        )
    }

    displayUser() {
        return (
            <>
                <ul className = 'nav'>
                    <li className = 'nav-item'>
                        Welcome {this.props.user.role}: {this.props.user.username}
                    </li>
                    <li className = 'nav-item'><button className='btn btn-danger'
                        onClick={ this.logout }>Logout</button></li>
                </ul>
            </>
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