import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import './home.css';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            city: "",
            arrivalDate: null,
            departureDate: null,
            accomodates: null,
            redirectTo: null
        }
        this.onBlurDate = this.onBlurDate.bind(this);
        this.onFocusDate = this.onFocusDate.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
    }
    stateChangeHandler = (e) => {
        let updateState = {}
        updateState[e.target.name] = e.target.value
        this.setState(updateState);
    }
    onFocusDate = (e) => {
        e.currentTarget.type = "date";
    }
    onBlurDate = (e) => {
        e.currentTarget.type = "text"
    }


    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = "/login"
        } else {
            redirectVar = "/search/list"
        }
        return (
            <div className="home-container">
                <Navbar showMenu={true} logo="white"></Navbar>
                <div className="home-inner">
                    <div className="home-search" style={{ width: "100%", maxWidth: '1020px', margin: "150px 0px 10px 0px" }}>
                        <h1 id="intro" style={{ color: "#fff" }}>
                            <span>Book beach houses, cabins,</span><br />
                            <span>condos and more, worldwide</span>
                        </h1>

                        <form className="form-horizontal">
                            <div className="form-row">
                                <div className="col-12 col-md-4">
                                    <div className="row w-100 m-auto">
                                        <input type="text" name="city" className="form-control" id="location" placeholder="Where do you want to go?" onChange={this.stateChangeHandler} required />
                                    </div>
                                    <div className="row m-auto"><small>* Please metion only city name</small></div>
                                </div>
                                <div className="col-5 col-md-2">
                                    <input type="text" name="arrivalDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control" id="arrival" placeholder="Arrive" onChange={this.stateChangeHandler} />
                                </div>
                                <div className="col-5 col-md-2">
                                    <input type="text" name="departureDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control" id="departure" placeholder="Depart" onChange={this.stateChangeHandler} />
                                </div>
                                <div className="col-2">
                                    <input type="number" name="accomodates" className="form-control" min="1" max="9" placeholder="Guests" onChange={this.stateChangeHandler} />
                                </div>
                                <div className="col-12 col-md-2 ">
                                    <Link className="btn btn-primary search-button w-100 p-3" to={
                                        {
                                            pathname: redirectVar,
                                            props: {
                                                city: this.state.city,
                                                arrivalDate: this.state.arrivalDate,
                                                departureDate: this.state.departureDate,
                                                accomodates: {
                                                    min:this.state.accomodates
                                                }
                                            }
                                        }
                                    }

                                    >Search</Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;