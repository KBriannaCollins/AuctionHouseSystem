const { default: axios } = require('axios');

class RegisterService{
    constructor(){
        this.URI = 'http://localhost:5000/register';
    }

    addBidder(bidder){
        console.log(bidder)
        return axios.post(this.URI, bidder, {withCredentials: true})
    }
}

export default RegisterService;
