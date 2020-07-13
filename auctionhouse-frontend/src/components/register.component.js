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
                if (resp.status === 201){
                    alert("Successfully registered.")
                } else {
                    alert("Could not register user.")
                }
            }
        )
    }
    render(){
        return(
            <div className="form-group w-25">
                <form>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <h3 className="form-group">Registration Form</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5 className="form-group">Username:</h5>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" onChange={this.handleUsernameChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5 className="form-group">Password:</h5>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" onChange={this.handlePasswordChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <button type="submit" className="form-control" value="Submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>

                </form>
            </div>
            // <form onSubmit={this.handleSubmit}><p></p>
            //     <p><label>Enter your desired username:</label></p>
            //     <p><input type="text"  onChange={this.handleUsernameChange}/></p>
            //     <p><label>Enter your desired password:</label></p>
            //     <p><input type="text" onChange={this.handlePasswordChange}/></p>
            //     <p><input type="submit" value="Submit" onClick={this.handleSubmit}/></p>
            // </form>
        );
    }
}

function mapStateToProps(state){
    const { bidder } = state;
    return { bidder: bidder }
}

export default connect(mapStateToProps)(RegisterForm);

