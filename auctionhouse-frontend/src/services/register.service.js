const { default: axios } = require('axios');

class RegisterService{
    constructor(){
        this.URI = 'http://localhost:5000/users/';
    }

    addBidder(bidder){
        return axios.post(this.URI + bidder, {withCredentials: true})
    }
}

export default RegisterService;
