import React, { Component } from 'react'
import BookingHistory from './history'
import Proxy from '../proxy/proxy';

class TravelerHistory extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         forceReloadOnServerAuthFailureToggle: true
    //     }
    //     this.forceReload = this.forceReload.bind(this);
    // }
    // forceReload = () => {
    //     this.setState({
    //         forceReloadOnServerAuthFailureToggle: !this.state.forceReloadOnServerAuthFailureToggle
    //     })
    // }
    render() {
        return (
            <div>
               <Proxy/>
                <div className="container">
                    <BookingHistory 
                    historyFor="buyer"
                    NoCardMessage="You don't have any past or upcoming trips."
                    propertyHistoryTitle="Your past or upcoming trips:"
                    ></BookingHistory>
                </div>
            </div>
        )
    }
}

export default TravelerHistory;