import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../nav/navbar';
import axios from 'axios'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './search.css'

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
                amenity: []
            },
            searchResults: []
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
        this.onBlurDate = this.onBlurDate.bind(this);
        this.onFocusDate = this.onFocusDate.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.handleAminity = this.handleAminity.bind(this);
        this.imageSlider = this.imageSlider.bind(this);
        this.createCard = this.createCard.bind(this);
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
    onFocusDate = (e) => {
        e.currentTarget.type = "date";
    }
    onBlurDate = (e) => {
        e.currentTarget.type = "text"
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
        }).catch(err => {
            console.log(err);
        });
    }

    imageSlider = (images) => {
        return (
            <div id="carouselPropertyIndicators" className="carousel slide " data-interval="false">
                <ol className="carousel-indicators">
                    {
                        images.map((image, index) =>
                            <li data-target="#carouselPropertyIndicators" data-slide-to={index} ></li>)
                    }
                </ol>
                <div className="carousel-inner">
                    {
                        images.map((image, index) => {
                            return (
                                <div className={"carousel-item fixed-height" + (index === 0 ? " active" : "")}>
                                    <img className="auto-fit d-block w-100" src={image} alt={"slide_" + index} />
                                </div>
                            )
                        })
                    }
                </div>
                <a className="carousel-control-prev" href="#carouselPropertyIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselPropertyIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }

    createCard = () => {
        return (
            this.state.searchResults.map(result => {
                return (
                    <div className="card m-3">
                        <Link to={
                            {
                                pathname: "/search/detail",
                                props: {
                                    propertyId: result.propertyId
                                }
                            }

                        } className="text-dark">
                            <div className="card-body mr-0 pr-0 py-0">
                                <div className="row search-card-body mr-0">
                                    <div className="col-3">
                                        {this.imageSlider(result.photoUrl)}
                                    </div>
                                    <div className="col-9 position-relative">
                                        <div className="row w-100">
                                            <h5 className="card-title mb-0">{result.headline}</h5>
                                        </div>
                                        <div className="row w-100 mb-1">
                                            <small>{result.street + ", " + result.city + ", " + result.state + " " + result.zip}</small>
                                        </div>
                                        <div className="row w-100">
                                            <p className="card-text">
                                                <ul className="list-inline">
                                                    {result.bedroom ? <li className="list-inline-item border-left pl-2"><strong>{result.bedroom}</strong> BR</li> : ""}
                                                    {result.bathroom ? <li className="list-inline-item border-left pl-2"><strong>{result.bathroom}</strong> BA</li> : ""}
                                                    {result.accomodates ? <li className="list-inline-item border-left pl-2">sleeps <strong>{result.accomodates}</strong></li> : ""}
                                                    {result.amenities.length >0 ? result.amenities.slice(0,5).map(element => <li className="list-inline-item border-left pl-2"><strong>{element}</strong></li> ):""}
                                                </ul>
                                            </p>
                                        </div>
                                        <div className="row w-100 mt-auto p-2 position-absolute cardbottom">
                                            <div className="col-12">
                                                <h5 className="row">${result.oneNightRate} per night</h5>
                                                <small className="row">View details for total price</small>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </Link>
                    </div>
                );

            })
        );
    }

    componentDidMount() {
        this.getListOfProps();
    }

    render() {
        let redirectVar = null, feedbackMessage, imagePreview = this.state.profileUpateTempUrl ? this.state.profileUpateTempUrl : this.state.profilefilepath;
        if (!cookie.load('cookie')) {
            redirectVar = <Link to="/login"></Link>
        }
        let customBorderStyle = {};

        customBorderStyle.borderBottom = "1px solid #dbdbdb";


        return (
            <div>
                <Navbar showMenu={true} logo="blue"></Navbar>
                <nav className="nav navbar sticky-top navbar-light d-block bg-white pb-0" style={customBorderStyle}>

                    <form className="form-horizontal" onSubmit={this.applyFilterHandler}>
                        <div className="form-row w-100 pb-1" style={customBorderStyle}>
                            <div className="col-12 col-md-4 ">
                                <input type="text" name="city" className="form-control m-1" id="location" placeholder="Where do you want to go? (City name only) " onChange={this.stateChangeHandler} value={this.state.filters.city} />
                            </div>
                            <div className="col-5 col-md-2">
                                <input type="text" name="arrivalDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control m-1" id="arrival" placeholder="Arrive" value={this.state.arrivalDate} onChange={this.stateChangeHandler} value={this.state.filters.arrivalDate} />
                            </div>
                            <div className="col-5 col-md-2">
                                <input type="text" name="departureDate" onFocus={this.onFocusDate} onBlur={this.onBlurDate} className="form-control m-1" id="departure" placeholder="Depart" value={this.state.departureDate} onChange={this.stateChangeHandler} value={this.state.filters.departureDate} />
                            </div>
                            <div className="col-2">
                                <input type="number" name="accomodates" className="form-control m-1" min="1" max="9" placeholder="Guests" onChange={this.stateChangeHandler} value={this.state.filters.accomodates} />
                            </div>
                            <div className="col-12 col-md-2 ">
                                <button className="btn btn-primary search-button w-100 p-3 form-control m-1" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
                    <form className="form-horizontal" onSubmit={this.applyFilterHandler}>
                        <div className="form-row w-100 bg-light mb-0">
                            <input type="number" name="oneNightRate_min" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="min price" value={this.state.filters.oneNightRate.min} onChange={this.stateChangeHandler}></input>
                            <input type="number" name="oneNightRate_max" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="max price" value={this.state.filters.oneNightRate.max} onChange={this.stateChangeHandler}></input>
                            <input type="number" name="bedroom" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="#bedroom" value={this.state.filters.bedroom} onChange={this.stateChangeHandler}></input>
                            <input type="number" name="bathroom" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="#bathroom" value={this.state.filters.bathroom} onChange={this.stateChangeHandler}></input>
                            <div className="dropdown">
                                <button className="btn btn-white bg-light form-control-xs m-1 p-auto nav-link dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Amenities</button>
                                <div className="dropdown-menu p-1" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <div className="checkbox m-1">
                                            <label><input type="checkbox" className="mr-1" name="Pool" checked={this.state.filters.amenity.indexOf("Pool") !== -1} onChange={this.handleAminity} />Pool</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="checkbox m-1">
                                            <label><input type="checkbox" className="mr-1" name="TV" checked={this.state.filters.amenity.indexOf("TV") !== -1} onChange={this.handleAminity} />TV</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="checkbox m-1">
                                            <label><input type="checkbox" className="mr-1" name="Internet" checked={this.state.filters.amenity.indexOf("Internet") !== -1} onChange={this.handleAminity} />Internet</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="checkbox m-1">
                                            <label><input type="checkbox" className="mr-1" name="Garden" checked={this.state.filters.amenity.indexOf("Garden") !== -1} onChange={this.handleAminity} />Garden</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="checkbox m-1">
                                            <label><input type="checkbox" className="mr-1" name="Kitchen" checked={this.state.filters.amenity.indexOf("Kitchen") !== -1} onChange={this.handleAminity} />Kitchen</label>
                                        </div>
                                    </li>
                                </div>
                            </div>
                            <div className="col-6 col-md-2">
                                <select className="form-control-sm m-2 profile-field" id="sort" value={this.state.sortCriteria + (this.state.sortOrder === "ASC" ? "+" : "-")} onChange={this.sortHandler}>
                                    <option disabled="" hidden="" value="">Sort by</option>
                                    <option value="oneNightRate-" >Price: High to Low</option>
                                    <option value="oneNightRate+" >Price: Low to High</option>
                                    <option value="bedroom+" >Bedrooms: Fewest to Most</option>
                                    <option value="bedroom-" >Bedrooms: Most to Fewest</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-1 m-1">
                                <button className="btn btn-primary blue006 p-1 w-100 form-control-sm m-1" type="submit">Apply filters</button>
                            </div>
                        </div>
                    </form>
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