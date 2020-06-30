import React, { Component } from 'react';
import { connect } from 'react-redux';
import BidService from '../services/bid.service';



class BidForm extends Component {

    bidService = new BidService();

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleBidChange(e){
        let bid = Object.assign({}, this.props.bid);
        bid[event.target.name]
        this.props.dispatch({type: 'addBid', bid: newBid})

    }

    handleSubmit(e){
        e.preventDefault()

        this.bidService.addBid(this.props.bid).then()

    }

    render(){
        const FIELDS = []
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Enter the amount you would like to bet:</label>
                <input type="number"  onChange={this.handleBidChange}/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}