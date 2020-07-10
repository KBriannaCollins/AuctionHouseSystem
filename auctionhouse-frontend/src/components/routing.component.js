import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux'

import BidForm from './bidform.component';
import ProductForm from './productform.component';
import RegisterForm from './register.component';
import Login from './login.component';
import AuctionForm from './auctioneer.managment.component'
import AuctionList from './auctionlist.component'
import ProductList from './productlist.component'
import ManageList from './managelist.component'
import EmployeeForm from './employeeform.component';
import '../sass/nav.scss';



function UserNav(props) {
    const UserLoggedIn = props.user
    if (UserLoggedIn) {
        return <Nav className="mr-auto"><Link to='/auctionlist' className='nav_link'><h3>Auctions</h3></Link></Nav>
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
                    <Nav className="mr-auto"><Link to='/productlist' className='nav_link'><h3>View Products</h3></Link></Nav>
                    <Nav className="mr-auto"><Link to='/managelist' className='nav_link'><h3>Manage Auction</h3></Link></Nav>
                    <Login></Login>
                </Navbar>
                
                <Route path='/auctions/:id' component={BidForm}/>
                <Route path='/auctionlist' component={AuctionList}/>
                <Route path='/products' component={ProductForm}/>
                <Route path='/register' component={RegisterForm}/>
                <Route path='/productlist' component={ProductList}/>
                <Route path="/login" component={Login}/>
                <Route path='/managelist' component={ManageList}/>
                <Route path='/manage/:id' component={AuctionForm} />
                <Route path='/employee' component={EmployeeForm} />
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
