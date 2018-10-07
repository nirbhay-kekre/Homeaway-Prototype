import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../nav/navbar';
import axios from 'axios'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './search.css'
import SearchHederForm from './searchHeaderForm'
import ImageSlider from './imageSlider';

class SearchDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forceRelodOnServerSessionDeletedToggle: true,
            bookingSuccess: null,
            errorMessage: null,
            searchResult: {}
        }
        if (this.props.location && this.props.location.state && this.props.location.state.propertyId) {
            this.state.propertyId = this.props.location.state.propertyId
        }
        if (this.props.location && this.props.location.state && this.props.location.state.arrivalDate) {
            this.state.arrivalDate = this.props.location.state.arrivalDate
        }
        if (this.props.location && this.props.location.state && this.props.location.state.departureDate) {
            this.state.departureDate = this.props.location.state.departureDate;
        }
        if (this.props.location && this.props.location.state && this.props.location.state.accomodates_min) {
            this.state.accomodates_min = this.props.location.state.accomodates_min;
        }
        if (this.props.location && this.props.location.state && this.props.location.state.city) {
            this.state.city = this.props.location.state.city;
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.bookNowHandler = this.bookNowHandler.bind(this);
    }

    searchHandler = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/search/list',
            props: {
                city: this.state.city,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate,
                accomodates: {
                    min: this.state.accomodates_min
                }
            }
        })
    }

    componentDidMount() {
        this.getDetailOfPropert();
    }

    getDetailOfPropert() {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/property/search/detail?", {
            params: {
                propertyId: this.state.propertyId,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate,
                accomodates: this.state.accomodates_min
            }
        }).then(response => {
            if (response.data && response.data.results) {
                this.setState({
                    searchResult: response.data.results
                });
            }
        }).catch(error => {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            }
            else if (error.response.status === 401) {
                cookie.remove("cookie");
                this.setState({
                    forceRelodOnServerSessionDeletedToggle: !this.state.forceRelodOnServerSessionDeletedToggle
                })
            }
        });
    }

    stateChangeHandler = (e) => {
        let updateState = {}, name = e.target.name;
        updateState[e.target.name] = e.target.value;
        this.setState(updateState);
    }

    bookNowHandler = (e) => {
        e.preventDefault();
        let data = {
            owner_username: this.state.searchResult.username,
            arrivalDate: this.state.searchResult.arrivalDate,
            departureDate: this.state.searchResult.departureDate,
            propertyId: this.state.searchResult.propertyId,
            amountPaid: this.state.searchResult.totalPrice,
            occupants: this.state.searchResult.guests

        }
        axios.post("http://localhost:3001/property/book", data).then(response => {
            if (response.status === 200) {
                if (response.data.success) {
                    this.setState({
                        bookingSuccess: true,
                        errorMessage: null,
                    })
                } else {
                    this.setState({
                        bookingSuccess: false,
                        errorMessage: response.data.message,
                    })
                }
            }
            else {
                this.setState({
                    bookingSuccess: false,
                    errorMessage: "Something went wrong, try again later",
                })
            }
        }).catch(error => {
            if (error.message === "Network Error") {
                console.log("Server is down!");
                this.setState({
                    bookingSuccess: false,
                    errorMessage: "Backend server is down, try again later",
                })
            }
            else if (error.response.status === 401) {
                cookie.remove("cookie");
                this.setState({
                    forceRelodOnServerSessionDeletedToggle: !this.state.forceRelodOnServerSessionDeletedToggle
                })
            }
            else {
                this.setState({
                    bookingSuccess: false,
                    message: "Something went wrong, try again later"
                })
            }
        })
    }

    render() {
        let customBorderStyle = {};
        let redirectVar = null, feedbackMessage=null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login"></Redirect>
        }
        customBorderStyle.borderBottom = "1px solid #dbdbdb";
        if (this.state.bookingSuccess) {
            feedbackMessage = <div className="alert alert-success alert-dismissible row" role="alert">
                <div className="col-xs-2"><i className="material-icons">check_circle</i></div>
                <div className="col-xs-8 ml-2">
                    <strong>Success!</strong><br />
                    Booking is successful
                </div>
                <div className="col-xs-2"><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        } else if (this.state.bookingSuccess === false && this.state.errorMessage) {
            feedbackMessage = <div className="alert alert-danger alert-dismissible row" role="alert">
                <div className="col-xs-2"><i className="material-icons">warning</i></div>
                <div className="col-xs-8 ml-2">
                    <strong>Please try again.</strong><br />
                    {this.state.errorMessage}
            </div>
                <div className="col-xs-2"><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }
        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
                <nav className="nav navbar navbar-light d-block bg-white pb-0" style={customBorderStyle}>
                    <SearchHederForm
                        applySearchHandler={this.searchHandler}
                        customBorderStyle={customBorderStyle}
                        stateChangeHandler={this.stateChangeHandler}
                        city={this.state.city}
                        arrivalDate={this.state.arrivalDate}
                        departureDate={this.state.departureDate}
                        dateStateChangeHandler={this.stateChangeHandler}
                        accomodates={this.state.accomodates_min}
                    ></SearchHederForm>
                </nav>
                <div>
                    <div className="container">
                        <div className="row p-1">

                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <ImageSlider images={this.state.searchResult.photoUrl ? this.state.searchResult.photoUrl : []} index="unique" fixedHeight="500px" ></ImageSlider>
                                    </div>
                                </div>
                                <div className="row m-0 mt-1">
                                    <h3>{this.state.searchResult.headline}</h3>
                                </div>
                                <div className="row m-0">
                                    <i className="material-icons">location_on</i>
                                    <small>{this.state.searchResult.street + ", " + this.state.searchResult.city + ", " + this.state.searchResult.state + " " + this.state.searchResult.zip}</small>
                                </div>
                                <div className="row m-3 ">
                                    <div className="col-3 my-2 ">
                                        <div className="row ml-auto">
                                            <p className="p-0 m-0">Bedrooms <strong>{" " + this.state.searchResult.bedroom}</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-3 my-2 border-left">
                                        <div className="row w-100 ml-auto">
                                            <p className="p-0 m-0">Bathrooms <strong>{" " + this.state.searchResult.bathroom}</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-3 my-2 border-left">
                                        <div className="row ml-auto">
                                            <p className="p-0 m-0"> Sleeps <strong>{this.state.searchResult.accomodates}</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-3 my-2">
                                        <div className="row ml-auto border-left">
                                            <p className="p-0 m-0"> Min stay <strong>{this.state.searchResult.minNightStay} nights</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-4 pb-4 border-bottom">
                                    <div className="col-12">
                                        <div className="row">
                                            <h4>Description</h4>
                                        </div>
                                    </div>
                                    <p>{this.state.searchResult.propertyDescription}</p>
                                </div>
                                <div className="row m-4 pb-4 border-bottom">
                                    <div className="col-12">
                                        <div className="row">
                                            <h4>Amenities</h4>
                                        </div>
                                        <div className="row">
                                            {this.state.searchResult.amenities ? this.state.searchResult.amenities.map(amenity =>
                                                <div className="col-4"><p>{amenity}</p></div>
                                            ) : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 border-left border-right">
                                {feedbackMessage}
                                <div className="row m-3">
                                    <h3>${this.state.searchResult.oneNightRate}</h3>
                                    <p className="text-muted p-2"> per night</p>
                                </div>
                                <div className="row mx-3 my-4">
                                    <div className="col-12">
                                        <div className="row border">
                                            <div className="col-6 border-right">
                                                <div className="row">
                                                    <small className="w-100 text-center text-muted">Check In</small>
                                                </div>
                                                <div className="row">
                                                    <p className="w-100 text-center" >{this.state.searchResult.arrivalDate}</p>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <small className="w-100 text-center text-muted">Check Out</small>
                                                </div>
                                                <div className="row">
                                                    <p className="w-100 text-center" >{this.state.searchResult.departureDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row border">
                                            <div className="col-12">
                                                <div className="row">
                                                    <small className="w-100 text-center text-muted">guests</small>
                                                </div>
                                                <div className="row">
                                                    <p className="w-100 text-center" >{this.state.searchResult.guests + " guests"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mx-3 my-4">
                                    <h4 className="text-muted text-left col-6">Total: </h4>
                                    <h4 className="text-right col-6 w-100">${this.state.searchResult.totalPrice}</h4>
                                </div>
                                <div className="row m-4">
                                    <button class="btn btn-primary search-button w-100 p-3 m-1" type="button" onClick={this.bookNowHandler}>Book Now</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default SearchDetail;