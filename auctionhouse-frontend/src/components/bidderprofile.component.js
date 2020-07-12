
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import AuctionService from '../services/auction.service';
import UserService from '../services/user.service';


function HistoryTable(props) {
    console.log(props)
    console.log(props.prod)
    let name = null
    let description = null
    for (let item of props.prod){
        console.log(item)
        if (item.auction_id === props.bid.auction_id){
            name = item.name
            description = item.description
            console.log(name, description)
        }
    }
    let amount = props.bid.amount
    let result = props.bid.bid_status

    return(
        <tr>
            <td>{name}</td>
            <td>{description}</td>
            <td>{amount}</td>
            <td>{result}</td>
        </tr>
    )
}


class BidderProfile extends Component {
    
    userService = new UserService

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        let auctionIdArr = []
        for (let i = 0; i < this.props.user.history.length; i++){
            auctionIdArr.push(this.props.user.history[i].auction_id)
        }
        this.userService.getProdInfoByUserID(this.props.user._id).then(resp =>
            {
                this.props.dispatch({type: 'loadProdHistory', prodHistory: resp.data})
            }
        )
    }


    fullbidList(user) {
        return (
            <Table striped bordered hover variant= "light">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Amount Bid</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.history.map((bid) => {
                            return <HistoryTable prod={this.props.prodHistory} bid={bid}/>
                        })
                    }
                </tbody>
            </Table>
        )
    }

    render() {
        console.log(this.props.user)
        if(this.props.user && this.props.user.history.length !== 0) {
            console.log('inside the if statement')
            return (this.fullbidList(this.props.user));
        }else{
            return(
                <>
                    <h1>There is no bid history at the moment.</h1>
                </>
            )
        }
    }
}

function mapStateToProps(state) {
    const { user, prodHistory } = state;
    return { user: user, prodHistory: prodHistory }
}

export default connect(mapStateToProps)(BidderProfile);