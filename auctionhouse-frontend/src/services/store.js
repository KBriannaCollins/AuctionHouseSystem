import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
    bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0},
}


function auctionReducer(state = initialState, action){
    switch(action.type){
        case 'handleBidChange':
            return Object.assign({}, state, {bid: action.bid})
        default:
            return state;
    }




let store = createStore(auctionReducer);

export default store;