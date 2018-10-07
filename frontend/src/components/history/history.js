import React, { Component } from 'react'
import SearchResultCard from './../search/searchResultCard'
import axios from 'axios'
import cookie from 'react-cookies';

class BookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3001/property/history?bookingHistoryFor=${this.props.bookingHistoryFor}`).
            then(response => {
                if (response.data && response.data.results) {
                    this.setState({
                        searchResults: response.data.results,
                        error: null,
                    });
                }
            }).catch(error => {
                if (error.message === "Network Error") {
                    console.log("Backend Server is down!");
                }
                else if (error.response.status === 401) {
                    console.log("removing cookie as server didn't authenticate current user")
                    cookie.remove("cookie");
                    if (this.props.forceReloadParentComponent) {
                        this.props.forceReloadParentComponent();
                    }
                } else if (error.response.status === 400 || error.response.status === 500) {
                    console.log("Error: " + error.response.status + " " + error.response.data.message);
                }
            });
    }

    render() {
        return (
            <div>
                {this.getBookingHistoryCards()}
            </div>
        )
    }


    getBookingHistoryCards() {
        if (this.state.searchResults.length > 0) {
            return (
                <div>
                    <h3 className="m-4">{this.props.propertyHistoryTitle}</h3>

                    {this.state.searchResults.map(result => {
                        let customFooter = `amount paid: $${result.amountPaid}, occupants: ${result.occupants}, from: ${result.startDate}, to: ${result.endDate}`;
                        if (this.props.displaySoldBy) {
                            customFooter += ", Sold by: " + result.owner_username;
                        } else if (this.props.displayBoughtBy) {
                            customFooter += ", Buyer: " + result.buyer_username;
                        }
                        return (
                            <SearchResultCard
                                propertyId={result.propertyId}
                                photoUrl={result.photoUrl}
                                headline={result.headline}
                                street={result.street}
                                city={result.city}
                                state={result.state}
                                zip={result.zip}
                                bedroom={result.bedrrom}
                                bathroom={result.bathroom}
                                accomodates={result.accomodates}
                                oneNightRate={result.oneNightRate}
                                customFooter={customFooter}
                                cardFixedHeight="175px"
                                cardIndex={result.propertyId}
                            />
                        );
                    })}
                </div>

            );
        } else {
            return (
                <div className="text-center align-middle m-5">
                    <i class="material-icons blue006 m-3">card_travel</i><br />
                    <h4>{this.props.NoCardMessage}</h4>
                </div>
            )
        }
    }
}

export default BookingHistory;