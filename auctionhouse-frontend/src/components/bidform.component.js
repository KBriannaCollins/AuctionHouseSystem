import React, { Component } from 'react';
import { connect } from 'react-redux';
import BidService from '../services/bid.service';



class BidForm extends Component {

    bidService = new BidService();

    constructor(props){
        super(props);
        this.handleBidChange = this.handleBidChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBidChange(e){
        let newBid = Object.assign({}, this.props.bid);
        newBid['amount'] = parseFloat(e.target.value);
        this.props.dispatch({type: 'handleBidChange', bid: newBid})
        console.log(this.props.bid)
    }

    handleSubmit(e){
        e.preventDefault()
        this.bidService.addBid(this.props.bid).then(
            (resp) => {
                this.props.dispatch({type: 'addBid', bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0}})
                if (resp.status === 201){
                    alert("Successfully added your bid.")
                } else {
                    alert("Could not add your bid.")
                }
            }
        )
    }

    render(){
        return(
<<<<<<< HEAD
            <form onSubmit={this.handleSubmit}>
                <p><label>Enter the amount you would like to bet:</label></p>
=======
            <>
            <h3>Bid Proposal</h3>
            <form onSubmit={this.handleSubmit}>
                <h5>Enter the amount you would like to bet:</h5>
>>>>>>> e0fa59262640b812e7af67a9ca3bacc40706e4ca
                <p><input type="number"  onChange={this.handleBidChange}/></p>
                <p><input type="submit" value="Submit" onClick={this.handleSubmit}/></p>
            </form>
            </>
        );
    }
}

function mapStateToProps(state){
    const { bid, user } = state;
    return { bid: bid,
             user: user }
}

export default connect(mapStateToProps)(BidForm);