import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import SearchResultCard from '../search/searchResultCard'
import OwnerDashboardTab from './dashboardTab'
import BookingHistory from './../history/history'
import Proxy from '../proxy/proxy';

class OwnerAllProperties extends Component {
    render() {

        return (
            <div>
                <Proxy />
                <OwnerDashboardTab currentComponent="OwnerAllProperties" />
                <div className="container">
                    <BookingHistory
                        historyFor="owner"
                        NoCardMessage="You haven't posted any properties yet"
                        propertyHistoryTitle="All posted properties"
                    ></BookingHistory>
                </div>
            </div>
        )
    }
}

export default OwnerAllProperties;