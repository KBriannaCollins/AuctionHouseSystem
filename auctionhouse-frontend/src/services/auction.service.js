const { default: axios } = require('axios');

class AuctionService {
    constructor() {
        this.URI = 'http://localhost:5000/auctions'
    }

    updateAuctionStatus(infoObject) {
        return axios.put(this.URI + '/' + window.location.pathname.split('/')[2], infoObject, {withCredentials: true})
    }

    getOpenAuctions() {
        return axios.get(this.URI, {withCredentials: true})
    }

}

export default AuctionService