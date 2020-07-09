const { default: axios } = require('axios');

class AuctionService {
    constructor() {
        this.URI = 'http://localhost:5000/auctions'
    }

    updateAuctionStatus(infoObject) {
        return axios.put(this.URI + '/' + window.location.pathname.split('/')[2], infoObject, {withCredentials: true})
    }

    getOpenAuctions(querydict) {
        let queryString = "?"
        for (let query in querydict) {
            queryString+=`${query}=${querydict[query]}`
        }
        if (queryString.length <= 2) return axios.get(this.URI, {withCredentials: true})
        else return axios.get(this.URI+queryString, {withCredentials: true})
    }

}

export default AuctionService