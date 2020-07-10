import React, { Component } from 'react';
import AuctionService from '../services/auction.service'
import { Card, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'


function FilterAuctions(props) {

    const auctionService = props.auctionService
    const getAuctionList = props.getAuctionList

    function dayValueChange(e) {
        if (e.target.value !== '' || e.target.value !== '0') {
            auctionService.getOpenAuctions({status: 'Active', date_end: e.target.value}).then(res => {
                getAuctionList(res.data.auctions)
            })
        }
        else {
            auctionService.getOpenAuctions({status: 'Active'}).then(res => {
                getAuctionList(res.data.auctions)
            })
        }
    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Filter auctions by days remaining...</Form.Label>
                    <input type="number" onChange={dayValueChange} />
                </Form.Group>
            </Form>
        </>
    )
}


function AuctionCard(props) {
    const history = useHistory();

    let auctionId = props.auctionInfo._id
    let prod_name = props.auctionInfo.item.name
    let prod_descript = props.auctionInfo.item.description
    // let prod_pic = "https://i.pinimg.com/originals/bb/55/66/bb5566c14a95f1897b1e258e0fcb69fe.jpg"
    let numBids = props.auctionInfo.bids.length

    function handleClick() {
        history.push(`/auctions/${auctionId}`)
    }

    return(
        <div className="card-group" style={{}}>
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
                        There are {numBids} bids on this auction.
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
                        return <AuctionCard key={auction._id} auctionInfo={auction} />
                    })
                }
            </>
        )
    }

    render() {
        console.log(this.props.auctionList)
        if(this.props.auctionList && this.props.auctionList.length !== 0) {
            return (
                <>
                    <FilterAuctions auctionService={this.auctionService} getAuctionList={this.props.getAuctionList}></FilterAuctions>
                    { 
                        this.fullAuctionList(this.props.auctionList) 
                    }
                </>
                )
        }
        else {
            return(
                <>
                    <FilterAuctions auctionService={this.auctionService} getAuctionList={this.props.getAuctionList}></FilterAuctions>
                    <h1>No Open Auctions</h1>
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