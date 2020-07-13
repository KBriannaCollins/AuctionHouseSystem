import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form } from 'react-bootstrap'
import AuctionService from '../services/auction.service'

function EndAuctionCard(props) {
    const auctionService = new AuctionService()
    const thisAuction = props.auction
    let sortedBids = thisAuction.bids.sort((a, b) => {
        return b.amount - a.amount;
    })

    props.dispatch({type: 'setHighestBidder', bidder: sortedBids[0].bidder_id})

    function updateBidder(e) {
        props.dispatch({type: 'setHighestBidder', bidder: e.target.options[e.target.selectedIndex].value})
        console.log(props.bidder)
    }

    function sendWinningBid(e) {
        e.preventDefault()
        const winningBidData = {
            bidder_id: props.bidder,
            auction_id: window.location.pathname.split('/')[2]
        }
        auctionService.updateAuctionStatus(winningBidData).then(res => {
            console.log(res)
            if (res.status === 204){
                alert("Successfully ended the auction.")
            } else {
                alert("Could not end the auction.")
            }
        })
    }

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Title>Close an Auction</Card.Title>
        <Card.Body>
            <Form>
                <select onChange={updateBidder}>
                    {
                        sortedBids.map(bid => {
                            return <option key={bid._id} value={bid.bidder_id}>Bidder ID {bid.bidder_id}: ${bid.amount}</option>
                        })
                    }
                </select>
            </Form>
        </Card.Body>
        <Button onClick={sendWinningBid}>Select winning bid</Button>
        </Card>
    )
}

function mapStateToProps(state) {
    const { bidder } = state;
    return { bidder: bidder }
}

export default connect(mapStateToProps)(EndAuctionCard)