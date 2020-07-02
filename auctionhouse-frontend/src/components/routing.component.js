import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import BidForm from './bidform.component';
import Login from './login.component';

class Routing extends Component{
    render(){
        return <Router>
            <Link to='/auctions'>Auctions</Link>
            <Link to='/login'>Login</Link>
            <Route path='/auctions/:id' component={BidForm}/>
            <Route path="/login" component={Login}/>
        </Router>
    }
}

export default Routing;