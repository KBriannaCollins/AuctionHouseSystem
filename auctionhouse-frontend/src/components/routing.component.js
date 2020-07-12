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
import UserList from './userlist.component'
import ProductList from './productlist.component'
import ManageList from './managelist.component'
import EmployeeForm from './employeeform.component';
import BidderProfile from './bidderprofile.component';
import '../sass/nav.scss';



function UserNav(props) {
    const UserLoggedIn = props.user
    if (UserLoggedIn && 'role' in UserLoggedIn) {
        let role = UserLoggedIn.role
        role = role.toUpperCase()
        console.log('has a role')
        console.log(UserLoggedIn.role)
        if (role === 'MANAGER'){
            return <Nav className="mr-auto">
                        <Link to='/userlist' className='nav_link'><h3>Users List</h3></Link><h4>|</h4>
                        <Link to='/managelist' className='nav_link'><h3>Manage Auctions</h3></Link><h4>|</h4>
                        <Link to='/auctionlist' className='nav_link'><h3>Auctions</h3></Link>
                        <Link to='/productlist' className='nav_link'><h3>View Products</h3></Link>
                    </Nav>
        } else if (role === 'AUCTIONEER'){
            return <Nav className="mr-auto">
                        <Link to='/managelist' className='nav_link'><h3>Manage Auction</h3></Link><h4>|</h4>
                    </Nav>
        } else {//(UserLoggedIn.role.toUpper() === 'CURATOR'){
            return <Nav className="mr-auto">
                        <Link to='/auctionlist' className='nav_link'><h3>Auctions</h3></Link><h4>|</h4>
                        <Link to='/products' className='nav_link'><h3>Product Proposal</h3></Link><h4>|</h4>
                        <Link to='/productlist' className='nav_link'><h3>View Products</h3></Link>
                    </Nav>     
        }
    }
    else if (UserLoggedIn && 'history' in UserLoggedIn){
        return <Nav className="mr-auto">
                    <Link to='/bidderprofile' className='nav_link'><h3>View History</h3></Link>
                </Nav>
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
                    {/* <Nav className="mr-auto"><Link to='/products' className='nav_link'><h3>Product Proposal</h3></Link></Nav>
                    
                    <Nav className="mr-auto"><Link to='/managelist' className='nav_link'><h3>Manage Auction</h3></Link></Nav> */}
                    <Nav className="mr-auto"><Link to='/bidderprofile' className='nav_link'><h3>View History</h3></Link></Nav>
                    <Nav className="mr-auto"><Link to='/products' className='nav_link'><h3>Product Proposal</h3></Link></Nav>
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
                <Route path='/userlist' component={UserList}/>
                <Route path='/bidderprofile' component={BidderProfile}/>
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
