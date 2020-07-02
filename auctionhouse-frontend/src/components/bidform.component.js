import React, { Component } from 'react';
import { connect } from 'react-redux';
import BidService from '../services/bid.service';



class BidForm extends Component {

    bidService = new BidService();

    constructor(props){
        super(props);
        this.handleChange = this.handleBidChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleBidChange(e){
        let bid = Object.assign({}, this.props.bid);
        bid['amount'] = event.target.value;
        this.props.dispatch({type: 'addBid', bid: newBid})

    }

    handleSubmit(e){
        e.preventDefault()
        this.bidService.addBid(this.props.bid).then(
            (resp) => {
                //this resets the state of the bid
                this.props.dispatch({type: 'addBid', bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0}})
            }
        )

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

function mapStateToProps(state){
    const {bid} = state;
    return {bid: bid}
}

export default connect(mapStateToProps)(BidForm);