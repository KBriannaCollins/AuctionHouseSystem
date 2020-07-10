import React, { Component } from 'react';
import AuctionService from '../services/auction.service'
import { Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

function AuctionCard(props) {
    const history = useHistory();

    let auctionId = props.auctionInfo._id
    let prod_name = props.auctionInfo.item.name
    let prod_descript = props.auctionInfo.item.description
    // let prod_pic = "https://i.pinimg.com/originals/bb/55/66/bb5566c14a95f1897b1e258e0fcb69fe.jpg"
    let numBids = props.bidAmount

    function handleClick() {
        history.push(`/auctions/${auctionId}`)
    }

    return(
        <div class="card-group w-25" style={{alignContent: 'center'}}>
            <Card style={{width: '18rem'}}>
                {/* <img src={prod_pic} class="card-img-top"></img> */}
                <Card.Title>
                    <div>
                        {prod_name}
                    </div>
                </Card.Title>
                <Card.Body>
                    <div>
                        <p>{prod_descript}</p>
                    </div>
                    <div>
                        {numBids}
                    </div>    
                </Card.Body>
                <Button onClick={handleClick}>Place a bid</Button>
            </Card>
        </div>
    )
}

class AuctionList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.auctionService.getOpenAuctions({status: 'Active'}).then(resp => {
            this.props.getAuctionList(resp.data.auctions)
        })
    }

    auctionService = new AuctionService();

    fullAuctionList(auctions) { 
        return (
            <>
                {
                    auctions.map((auction) => {
                        let bidAmount = null;
                        console.log(auction)
                        console.log(auction.bids.length);
                        if (auction.bids.length === 0){
                            bidAmount = 'There are currently no bids.';
                        } else {
                            bidAmount = 'There are ' + String(auction.bids.length) + ' bids.';
                        }
                        return <AuctionCard key={auction._id} bidAmount={bidAmount} auctionInfo={auction} />
                    })
                }
            </>
        )
    }

    render() {
        console.log(this.props.auctionList)
        if(this.props.auctionList && this.props.auctionList.length !== 0) {
            return this.fullAuctionList(this.props.auctionList)
        }
        else {
            return(
                <>
                    <h1>Loading...</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctionList)