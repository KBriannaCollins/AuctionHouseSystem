const { default: axios } = require('axios');

class BidService{
    constructor(){
        this.URI = 'http://localhost:5000/auctions/';
    }

    addBid(bid){
        return axios.post(this.URI + window.location.pathname.split('/')[2], bid, {withCredentials: true})
        //may need {bid} instead
    }
}

export default BidService;

/**addBid(username){
    return axios.post(<uri to send post to>, <data trying to post>)
    }*/