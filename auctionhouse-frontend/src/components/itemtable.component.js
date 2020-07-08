import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductService from '../services/product.service';
import BidService from '../services/bid.service';
import BidService from '../services/auction.service';

class ItemTable extends Component{
    productService = new ProductService();
    auctionService = new AuctionService();
    bidService = new BidService();
    constructor(props){
        super(props);
    }
    render(){
        const location = this.props.location.pathname;
        if (location === '/products'){}
        else if (location === '/auctions'){}
        return(
            <>
            </>
        )
    }

}