import React, { Component } from 'react'
import BookingHistory from './../history/history'

import OwnerDashboardTab from './dashboardTab'

class OwnerSoldProperties extends Component {
    render() {
        return (
            <div>
                <OwnerDashboardTab currentComponent="OwnerSoldProperties" />
                <div className="container">
                    <BookingHistory 
                    historyFor="owner"
                    NoCardMessage="No property sold yet!"
                    propertyHistoryTitle="Properties Sold"
                    sold="true"
                    ></BookingHistory>
                </div>
            </div>
        )
    }
}

export default OwnerSoldProperties;