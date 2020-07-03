import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import BidForm from './bidform.component';
import Login from './login.component';
import { Navbar, Nav } from 'react-bootstrap';
import '../sass/nav.scss';

class Routing extends Component{
    render(){
        return (
        <>
            <Router>
                <Navbar>
                    <Navbar.Brand><Link to='/' className='nav_link'><h1>KTMN Auction House</h1></Link></Navbar.Brand>
                    <Nav className="mr-auto"><Link to='/auctions/1' className='nav_link'><h3>Auctions</h3></Link></Nav>
                    <Nav className="mr-auto"><Link to='/login' className='nav_link'><h3>Login</h3></Link></Nav>
                </Navbar>

                <Route path='/auctions/:id' component={BidForm}/>
                <Route path="/login" component={Login}/>
            </Router>
        </>
        )
        
        
    }
}

export default Routing;