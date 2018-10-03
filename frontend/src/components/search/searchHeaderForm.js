import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../nav/navbar';
import axios from 'axios'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './search.css'

class SearchHederForm extends Component {

    constructor(props){
        super(props);
        this.onBlurDate = this.onBlurDate.bind(this);
        this.onFocusDate = this.onFocusDate.bind(this);
    }
    onFocusDate = (e) => {
        e.currentTarget.type = "date";
    }
    onBlurDate = (e) => {
        e.currentTarget.type = "text"
    }
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.applySearchHandler}>
                <div className="form-row w-100 pb-1" style={this.props.customBorderStyle}>
                    <div className="col-12 col-md-4 ">
                        <input type="text" name="city" className="form-control m-1" id="location" placeholder="Where do you want to go? (City name only) " onChange={this.props.stateChangeHandler} value={this.props.city} />
                    </div>
                    <div className="col-5 col-md-2">
                        <input type="text" name="arrivalDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control m-1" id="arrival" placeholder="Arrive" value={this.props.arrivalDate} onChange={this.props.dateStateChangeHandler} />
                    </div>
                    <div className="col-5 col-md-2">
                        <input type="text" name="departureDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control m-1" id="departure" placeholder="Depart" value={this.props.departureDate} onChange={this.props.dateStateChangeHandler}/>
                    </div>
                    <div className="col-2">
                        <input type="number" name="accomodates_min" className="form-control m-1" min="1" max="9" placeholder="Guests" onChange={this.props.stateChangeHandler} value={this.props.accomodates} />
                    </div>
                    <div className="col-12 col-md-2 ">
                        <button className="btn btn-primary search-button w-100 p-3 form-control m-1" type="submit">Search</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchHederForm;