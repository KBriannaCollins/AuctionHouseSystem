import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.expirationDateChange = this.expirationDateChange.bind(this);
    }

    expirationDateChange(e) {
        let newAuction = Object.assign({}, this.props.auction)
        newAuction.numOfDays = parseInt(e.target.value)
        this.props.dispatch({type: 'expirationDateChange', auction: newAuction})
        console.log(this.props.auction)
    }

    render() {
        let useDatepicker = this.props.auction.expiration_type
        if (useDatepicker === 'Automatic') {
            return (
            <>
                <Row>
                    <Col><label htmlFor="expiration">How many days should this auction last?</label></Col>
                </Row>
                <Row>
                    <Col><input type="number" name="expiration"
                    onChange={ this.expirationDateChange }>
                    </input></Col>
                </Row>
            </>
            )
        } else {
            return <Row></Row>
        }
    }
}

function mapStateToProps(state) {
    const { auction } = state;
    return { auction: auction }
}

export default connect(mapStateToProps)(DatePicker)
