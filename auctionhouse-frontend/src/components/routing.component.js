import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import BidForm from './bidform.component';
import Login from './login.component';
<<<<<<< HEAD

import BidForm from './bidform.component';
=======
>>>>>>> 9a5f54f039b7e8cd17aa3c4a1d6d03db289265c3

class Routing extends Component{
    render(){
        return <Router>
            <Link to='/auctions'>Auctions</Link>
            <Link to='/login'>Login</Link>
            <Route path='/auctions/:id' component={BidForm}/>
<<<<<<< HEAD
            <Login></Login>
=======
            <Route path="/login" component={Login}/>
>>>>>>> 9a5f54f039b7e8cd17aa3c4a1d6d03db289265c3
        </Router>
    }
}

export default Routing;