import { createStore } from 'redux';

const initialState = {
    user: null, //username and password?
    role: '',
    auction: {},
    bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0},
    product: {'name': '', 'description': '', 'start_bid': 0},
    auctionList: []
}


function auctionReducer(state = initialState, action){
    switch(action.type){
        case 'login':
            return Object.assign({}, state, {username: '', user: action.user})
        case 'handleUsername':
            return Object.assign({}, state, {username: action.username})
        case 'handleBidChange':
            return Object.assign({}, state, {bid: action.bid})
        case 'addBid':
            return Object.assign({}, state, {bid: action.bid})
        case 'handleProductFieldChange':
            return Object.assign({}, state, {product: action.product})
        case 'loadAuction':
            return Object.assign({}, state, {auction: action.auction})
        case 'expirationTypeChange':
            return Object.assign({}, state, {auction: action.auction})
        case 'expirationDateChange':
            return Object.assign({}, state, {auction: action.auction})
        case 'loadAuctionList':
            return Object.assign({}, state, {auctionList: action.auctionList})
        default:
            return state;
    }
}




let store = createStore(auctionReducer);

export default store;