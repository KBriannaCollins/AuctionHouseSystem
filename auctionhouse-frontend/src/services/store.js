import { createStore } from 'redux';

const initialState = {
    user: null,
    username: '',
    bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0},
}


function auctionReducer(state = initialState, action){
    // switch(action.type){
    //     case 'handleBidChange':
    //         return Object.assign({}, state, {bid: action.bid})
    //I'm not entirely sure if we should add this
    //I'll admit that I am a little confused
    //I also feel like we talked about not needing a store?



    }




let store = createStore(auctionReducer);

export default store;