const axios = require('axios');

class BidService{
    constructor(){
        this.URI = 'http://localhost:3000/auctions/'
    }

    addBid(bid){
        return axios.post(this.URI + bid.bidder_id, )   
    }
}

// addBid(username){
    //     return axios.post(<uri to send post to>, <data trying to post>)
        
    // }