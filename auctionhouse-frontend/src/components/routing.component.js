import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import BidForm from './bidform.component';
import Product from './product.component';
import ProductForm from './productform.component';
import Login from './login.component';
import { Navbar, Nav } from 'react-bootstrap';
import AuctionForm from './auctioneer.managment.component'
import '../sass/nav.scss';
import { connect } from 'react-redux'


function UserNav(props) {
    const UserLoggedIn = props.user
    if (UserLoggedIn) {
        return <Nav className="mr-auto"><Link to='/auctions/1' className='nav_link'><h3>Auctions</h3></Link></Nav>
    }
    else {
        return <Nav className="mr-auto"></Nav>
    }
}

class Routing extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        return (
        <>
            <Router>
                <Navbar>
                    <Navbar.Brand><Link to='/' className='nav_link'><h1>KTMN Auction House</h1></Link></Navbar.Brand>
                    <UserNav user={this.props.user}></UserNav>
                    <Nav className="mr-auto"><Link to='/products' className='nav_link'><h3>Product Proposal</h3></Link></Nav>
                    <Nav className="mr-auto"><Link to='/viewproducts' className='nav_link'><h3>View Products</h3></Link></Nav>
                    <Nav className="mr-auto"><Link to='/login' className='nav_link'><h3>Login</h3></Link></Nav>
                    <Nav className="mr-auto"><Link to='/manage/1' className='nav_link'><h3>Manage Auction</h3></Link></Nav>
                    <Login></Login>
                </Navbar>
                
                <Route path='/auctions/:id' component={BidForm}/>
                <Route path='/products' component={ProductForm}/>
                <Route path='/viewproducts' component={Product}/>
                <Route path="/login" component={Login}/>
                <Route path='/manage/:id' component={AuctionForm}/>
            </Router>
        </>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return {user: user}
}

export default connect(mapStateToProps)(Routing);