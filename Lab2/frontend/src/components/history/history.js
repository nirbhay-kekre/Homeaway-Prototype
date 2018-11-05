import React, { Component } from 'react'
import SearchResultCard from './../search/searchResultCard'
import { fetchPropertyHistory } from './../../actions/propertyhistoryAction'
import Proxy from '../proxy/proxy';
import Pagination from 'react-js-pagination'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class BookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            currentPage: 1,
            city: "",
            headline: "",
            limit: 5
        }
        this.onChange = this.onChange.bind(this);
        this.getPropertyView = this.getPropertyView.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getBookingHistoryCards = this.getBookingHistoryCards.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await this.props.fetchPropertyHistory({
                city: this.state.city,
                headline: this.state.headline
            }, this.props.historyFor, this.props.sold);
            this.setState({
                searchResults: this.getPropertyView(response.data.properties),
                currentPage: 1,
            })
        }
        catch (error) {
            // No need to do error handling here, already done in Action
        }
    }
    componentDidMount = async () => {
        try {
            debugger;
            let response = await this.props.fetchPropertyHistory({
                city: this.state.city,
                headline: this.state.headline
            }, this.props.historyFor, this.props.sold);
            let searchResults = this.getPropertyView(response.data.properties);
            ;
            this.setState({
                searchResults,
                currentPage: 1,
            })
        }
        catch (error) {
            // No need to do error handling here, already done in Action
        }
    }

    getPropertyView = (properties) => {
        let propertyView = [];
        let loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            loggedInUser = JSON.parse(loggedInUser)
        }
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];

            let element = {
                owner: property.owner,
                propertyId: property.propertyId,
                photoUrl: property.photoUrl,
                headline: property.headline,
                street: property.street,
                city: property.city,
                state: property.state,
                zip: property.zip,
                bedroom: property.bedroom,
                bathroom: property.bathroom,
                accomodates: property.accomodates,
                oneNightRate: property.oneNightRate,
                minNightStay: property.minNightStay,
                amenities: property.amenities
            }
            if (this.props.historyFor === "owner" && !this.props.sold) {
                // All properties for owner
                propertyView.push({
                    ...element,
                });
            }
            else {
                //properties which are sold
                for (let j = 0; j < property.history.length; j++) {
                    let history = property.history[j];
                    if (this.props.historyFor === "buyer" && history.buyer !== loggedInUser.username) {
                        continue;
                    }
                    propertyView.push({
                        ...element,
                        amountPaid: history.amountPaid,
                        buyer: history.buyer,
                        occupants: history.guests,
                        startDate: history.arrivalDate.substring(0, 10),
                        endDate: history.departureDate.substring(0, 10)
                    });
                }
            }
        }
        return propertyView;
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    getBookingHistoryCards() {
        if (this.state.searchResults.length > 0) {
            debugger;
            return (
                <div>
                    <form className="form-horizontal" onSubmit={this.onSubmit}>
                        <div className="form-row w-100 pb-1" style={this.customBorderStyle}>
                            <div className="col-5 ">
                                <input type="text" name="city" className="form-control m-1" id="location" placeholder="City name" onChange={this.onChange} value={this.state.city} />
                            </div>

                            <div className="col-5">
                                <input type="text" name="headline" className="form-control m-1" min="1" max="9" placeholder="property headline" onChange={this.onChange} value={this.state.headline} />
                            </div>
                            <div className="col-2 ">
                                <button className="btn btn-primary search-button w-100 p-3 form-control m-1" type="submit">Filter</button>
                            </div>
                        </div>
                    </form>
                    <h3 className="m-4">{this.props.propertyHistoryTitle}</h3>

                    {
                        this.state.searchResults.slice(((this.state.currentPage - 1) * this.state.limit), (this.state.currentPage * this.state.limit)).map(result => {
                            let customFooter = null
                            if ((this.props.historyFor === "owner" && this.props.sold) || this.props.historyFor === "buyer") {
                                customFooter = `amount paid: $${result.amountPaid}, occupants: ${result.occupants}, from: ${result.startDate}, to: ${result.endDate}`;
                                if (this.props.historyFor === "buyer") {
                                    customFooter += ", Sold by: " + result.owner;
                                } else if (this.props.historyFor === "owner" && this.props.sold) {
                                    customFooter += ", Buyer: " + result.buyer;
                                }
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
                                    minNightStay={result.minNightStay}
                                    cardFixedHeight="175px"
                                    amenities = {result.amenities}
                                    cardIndex={result.bookingId}
                                    owner={result.owner}
                                />
                            );
                        })}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            activePage={this.state.currentPage}
                            itemsCountPerPage={this.state.limit}
                            totalItemsCount={this.state.searchResults.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                    </div>
                </div>

            );
        } else {
            return (
                <div>
                    <form className="form-horizontal" onSubmit={this.onSubmit}>
                        <div className="form-row w-100 pb-1" style={this.customBorderStyle}>
                            <div className="col-5 ">
                                <input type="text" name="city" className="form-control m-1" id="location" placeholder="City name" onChange={this.onChange} value={this.state.city} />
                            </div>

                            <div className="col-5">
                                <input type="text" name="headline" className="form-control m-1" min="1" max="9" placeholder="property headline" onChange={this.onChange} value={this.state.headline} />
                            </div>
                            <div className="col-2 ">
                                <button className="btn btn-primary search-button w-100 p-3 form-control m-1" type="submit">Filter</button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center align-middle m-5">
                        <i class="material-icons blue006 m-3">card_travel</i><br />
                        <h4>{this.props.NoCardMessage}</h4>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Proxy />
                {this.getBookingHistoryCards()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

BookingHistory.propTypes = {
    fetchPropertyHistory: PropTypes.func.isRequired,

}
export default connect(mapStateToProps, { fetchPropertyHistory })(BookingHistory);