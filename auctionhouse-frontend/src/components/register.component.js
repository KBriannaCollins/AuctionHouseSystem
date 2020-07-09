import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterService from '../services/register.service';

class RegisterForm extends Component{

    registerService = new RegisterService();

    constructor(props){
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameChange(e){
        let newBidder = Object.assign({}, this.props.bidder);
        newBidder.username = e.target.value;
        this.props.dispatch({type: 'handleUsernameChange', bidder: newBidder})
        console.log('Username:', this.props.bidder)
    }
    handlePasswordChange(e){
        let newBidder = Object.assign({}, this.props.bidder);
        newBidder.password = e.target.value;
        this.props.dispatch({type: 'handlePasswordChange', bidder: newBidder})
        console.log(this.props.bidder)
    }
    handleSubmit(e){
        e.preventDefault()
        this.registerService.addBidder(this.props.bidder).then(
            (resp) => {
                this.props.dispatch({type: 'addBidder', bidder: {'username': '', 'password': ''}})
            }
        )
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}><p></p>
                <p><label>Enter your desired username:</label></p>
                <p><input type="text"  onChange={this.handleUsernameChange}/></p>
                <p><label>Enter your desired password:</label></p>
                <p><input type="text" onChange={this.handlePasswordChange}/></p>
                <p><input type="submit" value="Submit" onClick={this.handleSubmit}/></p>
            </form>
        );
    }
}

function mapStateToProps(state){
    const { bidder } = state;
    return { bidder: bidder }
}

export default connect(mapStateToProps)(RegisterForm);

