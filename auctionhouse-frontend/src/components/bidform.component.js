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

    componentDidMount() {
        let bid = Object.assign({}, this.props.bid);
        let user = Object.assign({}, this.props.user);

        bid['bidder_id'] = this.props.user._id
        this.props.dispatch({type: 'handleBidChange', bid: bid})
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
            <div class="form-group w-25">
                <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <h3 class="form-group">Bid Proposal</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <h5 class="small_h5">Amount to bet:</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <input class="form-control" type="number" onChange={this.handleBidChange}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <button class="form-control" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>    
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    const { bid, user } = state;
    return { bid: bid,
             user: user }
}

export default connect(mapStateToProps)(BidForm);