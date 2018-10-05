import React, { Component } from 'react'
import BookingHistory from './history'
import Navbar from '../nav/navbar';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

class TravelerHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forceReloadOnServerAuthFailureToggle: true
        }
        this.forceReload = this.forceReload.bind(this);
    }
    forceReload = () => {
        this.setState({
            forceReloadOnServerAuthFailureToggle: !this.state.forceReloadOnServerAuthFailureToggle
        })
    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login"></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
                <div className="container">
                    <BookingHistory 
                    bookingHistoryFor="traveler"
                    NoCardMessage="You don't have any past or upcoming trips."
                    propertyHistoryTitle="Your past or upcoming trips:"
                    forceReloadParentComponent={this.forceReload}
                    ></BookingHistory>
                </div>
            </div>
        )
    }
}

export default TravelerHistory;