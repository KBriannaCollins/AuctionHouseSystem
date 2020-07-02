import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import BidForm from './bidform.component';
import Login from './login.component';

import BidForm from './bidform.component';

class Routing extends Component{
    render(){
        return <Router>
            <Link to='/auctions'>Auctions</Link>
            <Route path='/auctions/:id' component={BidForm}/>
            <Login></Login>
        </Router>
    }
}

export default Routing;