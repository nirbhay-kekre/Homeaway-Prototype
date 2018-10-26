import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ImageSlider from './imageSlider'
import { fetchPropertyDetail } from './../../actions/fetchPropertyAction'

class SearchDetail extends Component {

    constructor(props) {
        super(props);
        this.formatDate =this.formatDate.bind(this);
        this.state = {
            arrivalDate: this.props.location.state.arrivalDate || this.formatDate(new Date()),
            departureDate: this.props.location.state.departureDate || this.formatDate(new Date()),
            accomodates: this.props.location.state.accomodates_min || 1,
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    formatDate = (date) => {
        return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    }
    componentWillMount() {

        const params = {
            propertyId: this.props.location.state.propertyId,
            arrivalDate: this.state.arrivalDate,
            departureDate: this.state.departureDate,
            accomodates: this.state.accomodates
        }
        this.props.fetchPropertyDetail(params);
    }

    render() {
        let feedbackMessage = null;
        return (

            <div>

                <div className="container">
                    <div className="row p-1">

                        <div className="col-8">
                            <div className="row">
                                <div className="col-12">
                                    <ImageSlider images={this.props.result.photoUrl ? this.props.result.photoUrl : []} index="unique" fixedHeight="500px" ></ImageSlider>
                                </div>
                            </div>
                            <div className="row m-0 mt-1">
                                <h2>{this.props.result.headline}</h2>
                            </div>
                            <div className="row m-0">
                                <i className="material-icons">location_on</i>
                                <small>{this.props.result.street + ", " + this.props.result.city + ", " + this.props.result.state + " " + this.props.result.zip}</small>
                            </div>
                            <div className="row m-3 ">
                                <div className="col-3 my-2 ">
                                    <div className="row ml-auto">
                                        <p className="p-0 m-0">Bedrooms <strong>{" " + this.props.result.bedroom}</strong></p>
                                    </div>
                                </div>
                                <div className="col-3 my-2 border-left">
                                    <div className="row w-100 ml-auto">
                                        <p className="p-0 m-0">Bathrooms <strong>{" " + this.props.result.bathroom}</strong></p>
                                    </div>
                                </div>
                                <div className="col-3 my-2 border-left">
                                    <div className="row ml-auto">
                                        <p className="p-0 m-0"> Sleeps <strong>{this.props.result.accomodates}</strong></p>
                                    </div>
                                </div>
                                <div className="col-3 my-2">
                                    <div className="row ml-auto border-left">
                                        <p className="p-0 m-0"> Min stay <strong>{this.props.result.minNightStay} nights</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row m-4 pb-4 border-bottom">
                                <div className="col-12">
                                    <div className="row">
                                        <h4>Description</h4>
                                    </div>
                                </div>
                                <p>{this.props.result.propertyDescription}</p>
                            </div>
                            <div className="row m-4 pb-4 border-bottom">
                                <div className="col-12">
                                    <div className="row">
                                        <h4>Amenities</h4>
                                    </div>
                                    <div className="row">
                                        {this.props.result.amenities ? this.props.result.amenities.map(amenity =>
                                            <div className="col-4"><p>{amenity}</p></div>
                                        ) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 border-left border-right">
                            {feedbackMessage}
                            <div className="row m-3">
                                <h4>${this.props.result.oneNightRate}</h4>
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
                                                <input type='date' className="w-100 text-center" name="arrivalDate" onChange={this.onChange} max={this.state.arrivalDate} value={this.state.arrivalDate}></input>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <small className="w-100 text-center text-muted">Check Out</small>
                                            </div>
                                            <div className="row">
                                                <input type='date' className="w-100 text-center" name="departureDate" onChange={this.onChange} min={this.state.arrivalDate} value={this.state.departureDate}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row border">
                                        <div className="col-12">
                                            <div className="row">
                                                <small className="w-100 text-center text-muted">guests</small>
                                            </div>
                                            <div className="row">
                                                <input type="number" className="w-100 text-center" name="accomodates" onChange={this.onChange} min="1" value={this.state.accomodates}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mx-3 my-4">
                                <h4 className="text-muted text-left col-6">Total: </h4>
                                <h4 className="text-right col-6 w-100">${this.props.result.totalPrice}</h4>
                            </div>
                            <div className="row m-4">
                                <button class="btn btn-primary search-button w-100 p-3 m-1" type="button" onClick={this.bookNowHandler}>Book Now</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    result: state.searchProperty.result
})

SearchDetail.propTypes = {
    fetchPropertyDetail: PropTypes.func.isRequired,
    result: PropTypes.array.isRequired
}
export default connect(mapStateToProps, { fetchPropertyDetail })(SearchDetail);