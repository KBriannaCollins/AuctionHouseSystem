const { default: axios } = require('axios');

class RegisterService{
    constructor(){
        this.URI = 'http://localhost:5000/auctions/';
    }

    addBidder(bidder){
        return axios.post(this.URI + bidder, {withCredentials: true})
    }
}

export default BidService;
