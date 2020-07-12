
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';


function HistoryTable(bid) {
    console.log(bid)
    // let item = user.username
    // let description = user.username
    let amount = bid.bid.amount
    let result = bid.bid.bid_status

    return(
        <tr>
            <td>item</td>
            <td>description</td>
            <td>{amount}</td>
            <td>{result}</td>
        </tr>
    )
}


class BidderProfile extends Component {
    
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        let auctionIdArr = []
        for (let i = 0; i < this.props.user.history.length; i++){
            console.log(this.props.user.history[i])
            auctionIdArr.push(this.props.user.history[i].auction_id)
        }
    }


    fullbidList(user) {
        return (
            <Table>
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
                            return <HistoryTable bid={bid}/>
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
    const { user } = state;
    return { user: user }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         getUsers: (list) => dispatch({type: 'loadUserList', userList: list}),
//         dispatch
//     }
// }

export default connect(mapStateToProps)(BidderProfile);