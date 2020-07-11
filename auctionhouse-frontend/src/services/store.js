import { createStore } from 'redux';

const initialState = {
    user: null, //username and password?
    userList: [],
    role: '',
    bidHistory: [],
    auction: {},
    auctions: [],
    products: [],
    bid: {'bidder_id': -1, 'item_id': -1, 'amount': 0},
    product: {'name': '', 'description': '', 'start_bid': 0},
    auctionList: [],
    productList: [],
    bidder: {},
    employee: {}
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
        case 'loadProductList':
            return Object.assign({}, state, {productList: action.productList})
        case 'loadUserList':
            return Object.assign({}, state, {userList: action.userList})
        case 'loadProduct':
            return Object.assign({}, state, {product: action.product})
        case 'loadAuction':
            return Object.assign({}, state, {auction: action.auction})
        case 'loadUser':
            return Object.assign({}, state, {user: action.user})
        case 'expirationTypeChange':
            return Object.assign({}, state, {auction: action.auction})
        case 'expirationDateChange':
            return Object.assign({}, state, {auction: action.auction})
        case 'loadAuctionList':
            return Object.assign({}, state, {auctionList: action.auctionList})
        case 'setHighestBidder':
            return Object.assign({}, state, {bidder: action.bidder})
        case 'removeUser':
            return Object.assign({}, state, {userList: action.userList})
        case 'loadUserList':
            return Object.assign({}, state, {userList: action.userList})
        case 'handleUsernameChange':
            return Object.assign({}, state, {bidder: action.bidder})
        case 'handlePasswordChange':
            return Object.assign({}, state, {bidder: action.bidder})
        case 'handleUserFieldChange':
            return Object.assign({}, state, {user: action.user})   
        case 'handleEmpUsernameChange':
            return Object.assign({}, state, {employee: action.employee})
        case 'handleEmpPasswordChange':
            return Object.assign({}, state, {employee: action.employee})
        case 'handleRole':
            return Object.assign({}, state, {employee: action.employee})
        default:
            return state;
    }
}




let store = createStore(auctionReducer);

export default store;