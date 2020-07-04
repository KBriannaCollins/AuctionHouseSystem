import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import BidForm from './bidform.component';
import Login from './login.component';
import { Navbar, Nav } from 'react-bootstrap';
import '../sass/nav.scss';
import { connect } from 'react-redux'


function UserNav(props) {
    const isLoggedIn = props.user
    if (isLoggedIn) {
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
                    <Login></Login>
                </Navbar>

                <Route path='/auctions/:id' component={BidForm}/>
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