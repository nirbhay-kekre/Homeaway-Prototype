import React, { Component } from 'react'
import BookingHistory from './../history/history'
import Navbar from '../nav/navbar';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import OwnerDashboardTab from './dashBoardTab'

class OwnerSoldProperties extends Component {
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
            redirectVar = <Redirect to="/owner/login"></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
                <OwnerDashboardTab currentComponent="OwnerSoldProperties" />
                <div className="container">
                    <BookingHistory 
                    bookingHistoryFor="owner"
                    NoCardMessage="No property sold yet!"
                    propertyHistoryTitle="Properties Sold"
                    displayBoughtBy="true"
                    ></BookingHistory>
                </div>
            </div>
        )
    }
}

export default OwnerSoldProperties;