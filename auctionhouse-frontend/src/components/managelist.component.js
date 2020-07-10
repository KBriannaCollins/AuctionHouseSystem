import React, { Component } from 'react';
import AuctionService from '../services/auction.service'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

function AuctionCard(props) {
    const history = useHistory();

    let auctionId = props.auctionInfo._id
    let numBids = props.auctionInfo.bids.length

    function handleClick() {
        history.push(`/manage/${auctionId}`)
    }

    return(
        <>
            <Card style={{width: '18rem'}}>
                <Card.Title>Auction ID {auctionId}</Card.Title>
                <Card.Body>There are {numBids} bids on this auction</Card.Body>
                <Button onClick={handleClick}>Manage this auction</Button>
            </Card>
        </>
    )
}

class ManageList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.auctionService.getOpenAuctions({auct_id: -1}).then(resp => {
            this.props.getAuctionList(resp.data.auctions)
        })
    }

    auctionService = new AuctionService;

    fullAuctionList(auctions) {
        return (
            <>
                {
                    auctions.map((auction) => {
                        return <AuctionCard key={auction._id} auctionInfo={auction} />
                    })
                }
            </>
        )
    }

    render() {
        console.log(this.props.auctionList)
        if(this.props.auctionList && this.props.auctionList.length != 0) {
            return this.fullAuctionList(this.props.auctionList)
        }
        else {
            return(
                <>
                    <h1>Nothing to show</h1>
                </>
            )
        }
    }
}

function mapStateToProps(state) {
    const { auctionList } = state;
    return { auctionList: auctionList }
}

function mapDispatchToProps(dispatch) {
    return {
        getAuctionList: (list) => dispatch({type: 'loadAuctionList', auctionList: list})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageList)