import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
<<<<<<< HEAD
import BidForm from './bidform.component';
import Login from './login.component';
=======

import BidForm from './bidform.component';
>>>>>>> bd5051530e17a4d248949b21c26411aa9c7ee5bd

class Routing extends Component{
    render(){
        return <Router>
            <Link to='/auctions'>Auctions</Link>
            <Route path='/auctions/:id' component={BidForm}/>
<<<<<<< HEAD
            <Login></Login>
=======
>>>>>>> bd5051530e17a4d248949b21c26411aa9c7ee5bd
        </Router>
    }
}

export default Routing;