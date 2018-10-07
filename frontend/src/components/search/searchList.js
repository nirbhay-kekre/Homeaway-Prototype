import React, { Component } from 'react';
import Navbar from './../nav/navbar';
import axios from 'axios'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './search.css'
import SearchHederForm from './searchHeaderForm'
import SearchFilterHederForm from './searchFilterHeaderForm'
import SearchResultCard from './searchResultCard'

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortCriteria: null,
            sortOrder: null,
            filters: {
                oneNightRate: {
                    min: null,
                    max: null,
                },
                accomodates: {
                    min: null
                },
                bedroom:{
                    min: null
                },
                bathroom:{
                    min:null
                },
                amenity: []
            },
            searchResults: [],
            forceReloadToggle: true
        };
        if (this.props.location && this.props.location.props && this.props.location.props.city) {
            this.state.filters["city"] = this.props.location.props.city
        }
        if (this.props.location && this.props.location.props && this.props.location.props.arrivalDate) {
            this.state.arrivalDate = this.props.location.props.arrivalDate;
        }
        if (this.props.location && this.props.location.props && this.props.location.props.departureDate) {
            this.state.departureDate = this.props.location.props.departureDate;
        }
        if (this.props.location && this.props.location.props && this.props.location.props.accomodates) {
            this.state.filters["accomodates"] = this.props.location.props.accomodates;
        }
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.applyFilterHandler = this.applyFilterHandler.bind(this);
        this.getListOfProps = this.getListOfProps.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.handleAminity = this.handleAminity.bind(this);
        this.createCard = this.createCard.bind(this);
        this.dateStateChangeHandler = this.dateStateChangeHandler.bind(this);
    }
    dateStateChangeHandler = (e) => {
        let updateState = {};
        updateState[e.target.name] = e.target.value;
        this.setState(updateState);
    }

    sortHandler = (e) => {
        let sortCriteria = e.target.value;
        let sortOrder = "ASC";
        if (e.target.value.endsWith("+")) {
            sortCriteria = e.target.value.substring(0, e.target.value.length - 1);
            sortOrder = "ASC";
        } else if (e.target.value.endsWith("-")) {
            sortCriteria = e.target.value.substring(0, e.target.value.length - 1);
            sortOrder = "DESC";
        }
        if (sortCriteria) {
            this.setState({
                sortCriteria: sortCriteria,
                sortOrder: sortOrder
            })
        }
    }

    stateChangeHandler = (e) => {
        let filters = Object.assign({}, this.state.filters);
        let minMaxIndex = null;
        if ((minMaxIndex = e.target.name.indexOf("_min")) != -1) {
            filters[e.target.name.substring(0, minMaxIndex)].min = e.target.value;
        } else if ((minMaxIndex = e.target.name.indexOf("_max")) != -1) {
            filters[e.target.name.substring(0, minMaxIndex)].max = e.target.value;
        } else {
            filters[e.target.name] = e.target.value;
        }
        this.setState({
            filters: filters
        });
    }
    handleAminity = (e) => {
        let filters = Object.assign({}, this.state.filters);
        if (e.target.checked) {
            filters.amenity.push(e.target.name)
            this.setState({
                filters: filters
            })
        } else {
            const index = filters.amenity.indexOf(e.target.name);
            if (index != -1) {
                filters.amenity.splice(index, 1);
                this.setState({
                    filters: filters
                })
            }
        }
    }

    applyFilterHandler = (e) => {
        e.preventDefault();
        this.getListOfProps();
        return false;
    }

    getListOfProps = () => {
        const params = { filters: this.state.filters }
        if (this.state.sortCriteria) {
            params.sortCriteria = this.state.sortCriteria;
            if (this.state.sortOrder) {
                params.sortOrder = this.state.sortOrder;
            } else {
                params.sortOrder = "ASC";
            }
        }
        if (this.state.arrivalDate) {
            params.arrivalDate = this.state.arrivalDate
        }
        if (this.state.departureDate) {
            params.departureDate = this.state.departureDate
        }
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/property/search/list?", {
            params: params
        }).then(response => {
            if (response.data && response.data.results) {
                this.setState({
                    searchResults: response.data.results
                });
            }
        }).catch(error => {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            }
            else if (error.response.status === 401) {
                cookie.remove("cookie");
                this.setState({
                    forceReloadToggle: !this.state.forceReloadToggle
                })
            }
        });

    }

    

    createCard = () => {
        return (
            this.state.searchResults.map(result => 
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
                    amenities={result.amenities}
                    oneNightRate={result.oneNightRate}
                    arrivalDate={this.state.arrivalDate}
                    departureDate={this.state.departureDate}
                    guests ={this.state.filters.accomodates.min}
                    searchCity={this.state.filters.city}
                    cardFixedHeight="150px"
                    cardIndex={result.propertyId}
                ></SearchResultCard>
            )
        );
    }

    componentDidMount() {
        this.getListOfProps();
    }

    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login"></Redirect>
        }
        let customBorderStyle = {};

        customBorderStyle.borderBottom = "1px solid #dbdbdb";


        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
                <nav className="nav navbar sticky-top navbar-light d-block bg-white pb-0" style={customBorderStyle}>
                    <SearchHederForm
                        applySearchHandler={this.applyFilterHandler}
                        customBorderStyle={this.customBorderStyle}
                        stateChangeHandler={this.stateChangeHandler}
                        city={this.state.filters.city}
                        arrivalDate={this.state.arrivalDate}
                        departureDate={this.state.departureDate}
                        dateStateChangeHandler={this.dateStateChangeHandler}
                        accomodates={this.state.filters.accomodates.min}
                    ></SearchHederForm>
                    <SearchFilterHederForm
                        applyFilterHandler={this.applyFilterHandler}
                        oneNightRate={this.state.filters.oneNightRate}
                        stateChangeHandler={this.stateChangeHandler}
                        bedroom={this.state.filters.bedroom.min}
                        bathroom={this.state.filters.bathroom.min}
                        amenity={this.state.filters.amenity}
                        handleAminity={this.handleAminity}
                        sortCriteria ={this.state.sortCriteria}
                        sortOrder = {this.state.sortOrder}
                        sortHandler ={this.sortHandler} 
                    ></SearchFilterHederForm>
                    
                </nav>
                <div>
                    <div className="container">
                        {this.createCard()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchList;