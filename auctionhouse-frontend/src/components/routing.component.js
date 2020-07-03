import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import BidForm from './bidform.component';
import Login from './login.component';
import '../sass/nav.scss';

class Routing extends Component{
    render(){
        return (
        <>
            <Router>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Link to='/' className='nav_link'><h1>KTMN Auction House</h1></Link>
                            </td>
                            <td>
                                <Link to='/auctions/1' className='nav_link'><h3>Auctions</h3></Link>
                            </td>
                            <td>
                                <Link to='/login' className='nav_link'><h3>Login</h3></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Route path='/auctions/:id' component={BidForm}/>
                <Route path="/login" component={Login}/>
            </Router>
        </>
        )
        
        
    }
}

export default Routing;