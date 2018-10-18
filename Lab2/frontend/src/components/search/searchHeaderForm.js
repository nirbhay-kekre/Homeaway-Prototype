import React, { Component } from 'react';
import './search.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateSearchPropertyFilterCriteria } from './../../actions/fetchPropertyAction';
import {withRouter} from 'react-router-dom'
class SearchHederForm extends Component {

    constructor(props) {
        super(props);
        console.log("inside constructor ")
        console.log({filters : this.props.filters});
        this.state = {
            city: this.props.filters.city,
            arrivalDate: this.props.filters.arrivalDate,
            departureDate: this.props.filters.departureDate,
            accomodates: this.props.filters.accomodates
        }
        this.onBlurDate = this.onBlurDate.bind(this);
        this.onFocusDate = this.onFocusDate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let minMaxIndex = -1;
        if ((minMaxIndex = name.indexOf("_min")) !== -1) {
            name = name.substring(0, minMaxIndex);
            value = {
                ...this.state[name],
                min: e.target.value
            };
        } else if ((minMaxIndex = name.indexOf("_max")) !== -1) {
            name = name.substring(0, minMaxIndex);
            value = {
                ...this.state[name],
                max: e.target.value
            };
        }
        this.setState({
            [name]: value
        });
    }
    onFocusDate = (e) => {
        e.currentTarget.type = "date";
    }
    onBlurDate = (e) => {
        e.currentTarget.type = "text"
    }
    onSubmitHandler = async (e) => {
        e.preventDefault();
        //reseting filter upon search
        const filters = {
            ...(this.props.filters),
            ...this.state
        }
        await this.props.updateSearchPropertyFilterCriteria(filters);
        this.props.history.push({
            pathname: '/search/list'
        })
    }
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.onSubmitHandler}>
                <div className="form-row w-100 pb-1" style={this.customBorderStyle}>
                    <div className="col-12 col-md-4 ">
                        <input type="text" name="city" className="form-control m-1" id="location" placeholder="Where do you want to go? (City name only) " onChange={this.onChange} value={this.state.city} />
                    </div>
                    <div className="col-5 col-md-2">
                        <input type="text" name="arrivalDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control m-1" id="arrival" placeholder="Arrive" max={this.state.departureDate} value={this.state.arrivalDate} onChange={this.onChange} />
                    </div>
                    <div className="col-5 col-md-2">
                        <input type="text" name="departureDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control m-1" id="departure" placeholder="Depart" min={this.state.arrivalDate} value={this.state.departureDate} onChange={this.onChange} />
                    </div>
                    <div className="col-2">
                        <input type="number" name="accomodates_min" className="form-control m-1" min="1" max="9" placeholder="Guests" onChange={this.onChange} value={this.state.accomodates.min} />
                    </div>
                    <div className="col-12 col-md-2 ">
                        <button className="btn btn-primary search-button w-100 p-3 form-control m-1" type="submit">Search</button>
                    </div>
                </div>
            </form>
        )
    }
}

SearchHederForm.propTypes = {
    filters: PropTypes.object.isRequired,
    filters: PropTypes.shape({
        city: PropTypes.string,
        arrivalDate: PropTypes.string,
        departureDate: PropTypes.string,
        accomodates: PropTypes.object
    })
}

const mapStateToProps = (state) => ({
    filters: state.searchProperty.filters
})
export default withRouter(connect(mapStateToProps, { updateSearchPropertyFilterCriteria })(SearchHederForm));