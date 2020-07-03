import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

import BidForm from './bidform.component';
import RegisterForm from './register.component';

class Routing extends Component{
    render(){
        return <Router>
            <Link to='/auctions'>Auctions</Link>
            <Route path='/auctions/:id' component={BidForm}/>
            <Link to='/register'>Register new account</Link>
            <Route path='/register' component={RegisterForm}/>
        </Router>
    }
}

export default Routing;