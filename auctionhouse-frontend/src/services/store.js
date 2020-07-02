import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
    bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0},
}


function auctionReducer(state = initialState, action){
    switch(action.type){
<<<<<<< HEAD
        case 'login':
            return Object.assign({}, state, {username: '', user: action.user})
        case 'handleUsername':
            return Object.assign({}, state, {username: action.username})
=======
>>>>>>> bd5051530e17a4d248949b21c26411aa9c7ee5bd
        case 'handleBidChange':
            return Object.assign({}, state, {bid: action.bid})
        case 'addBid':
            return Object.assign({}, state, {bid: action.bid})
        default:
            return state;
    }
}




let store = createStore(auctionReducer);

export default store;