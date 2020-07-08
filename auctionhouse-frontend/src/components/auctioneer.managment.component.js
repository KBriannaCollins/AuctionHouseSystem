import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuctionService from '../services/auction.service'
import { Card, Button, Form } from 'react-bootstrap'
import DatePicker from './datepicker.component'
import EndAuctionCard from './endauctioncard.component'

function StartAuctionCard(props) {
    const expirationTypeChange = props.expirationTypeChange
    const updateStatus = props.updateStatus
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Title>Start an Auction</Card.Title>
        <Card.Body>
            <Form>
                <Form.Group>
                    <Form.Check type="checkbox" label="Should this auction expire automatically?" 
                    onChange={expirationTypeChange} />
                </Form.Group>
                <Form.Group>
                    <DatePicker />
                </Form.Group>
            </Form>
        </Card.Body>
        <Button name="Active" onClick={updateStatus}>Start Auction</Button>
    </Card>
    )
}

class AuctionForm extends Component {

    auctionService = new AuctionService();

    constructor(props) {
        super(props);
        this.updateStatus = this.updateStatus.bind(this);
        
        this.expirationTypeChange = this.expirationTypeChange.bind(this);
        
        // let defaultAuction = {expiration_type: 'Manual', numOfDays: 0}
        this.auctionService.getOpenAuctions({_id: parseInt(window.location.pathname.split('/')[2]) }).then( res => {
            this.props.dispatch({type: 'loadAuction', auction: res.data.auctions[0]})
            console.log(res.data.auctions[0])
        })
    }

    updateStatus(e) {
        e.preventDefault()
        this.auctionService.updateAuctionStatus(this.props.auction).then(
            resp => {
                this.props.dispatch({type: 'loadAuction', auction: {}})
            }
        )
    }

    expirationTypeChange(e) {
        console.log(e.target.checked)
        let newAuction = Object.assign({}, this.props.auction)
        if (e.target.checked) {
            newAuction.expiration_type = 'Automatic'
            this.props.dispatch({type: 'expirationTypeChange', auction: newAuction})
            console.log(this.props.auction)
        } else {
            newAuction.expiration_type = 'Manual'
            newAuction.numOfDays = 0
            this.props.dispatch({type: 'expirationTypeChange', auction: newAuction})
            console.log(this.props.auction)
        }
    }

    render() {
        if (this.props.auction && this.props.auction !== {}) {
            if (this.props.auction.status === 'Active') {
                return <EndAuctionCard auction={this.props.auction} />
            }
            else if (this.props.auction.status === 'Listed') {
                return <StartAuctionCard updateStatus={this.updateStatus} expirationTypeChange={this.expirationTypeChange} />
            }
            else {
                return null
            }
        }
        else {
            return null
        }
    }
}

function mapStateToProps(state) {
    const { auction } = state;
    return { auction: auction }
}

export default connect(mapStateToProps)(AuctionForm)
