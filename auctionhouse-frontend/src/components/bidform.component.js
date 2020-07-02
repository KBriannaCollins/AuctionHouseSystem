import React, { Component } from 'react';
import { connect } from 'react-redux';
import BidService from '../services/bid.service';



class BidForm extends Component {

    bidService = new BidService();

    constructor(props){
        super(props);
<<<<<<< Updated upstream
        this.handleChange = this.handleChange.bind(this);
=======
        this.handleBidChange = this.handleBidChange.bind(this);
>>>>>>> Stashed changes
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBidChange(e){
        let newBid = Object.assign({}, this.props.bid);
        newBid['amount'] = e.target.value;
        this.props.dispatch({type: 'addBid', bid: newBid})

    }

    handleSubmit(e){
        e.preventDefault()
        this.bidService.addBid(this.props.bid).then(
            (resp) => {
                this.props.dispatch({type: 'addBid', bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0}})
            }
        )
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}><p></p>
                <p><label>Enter the amount you would like to bet:</label></p>
                <p><input type="number"  onChange={this.handleBidChange}/></p>
                <p><input type="submit" value="Submit" onClick={this.handleSubmit}/></p>
            </form>
        );
    }
}

function mapStateToProps(state){
    const { bid } = state;
    return { bid: bid }
}

export default connect(mapStateToProps)(BidForm);