import React, { Component } from 'react'
import { updateBookingOptionAction } from '../../actions/postPropertyAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostPropertyBookingMethod extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            bookingOption: this.props.bookingOptions.bookingOption
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
         this.props.updateBookingOptionAction({
            bookingOption: this.state.bookingOption
        },"photos");
    }

    backHandler = (e) => {
        e.preventDefault();
         this.props.updateBookingOptionAction({
            bookingOption: this.state.bookingOption
        }, "details");
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Booking options</h4>
                <h5 className="mx-4">Select a booking method</h5>
                <form onSubmit={this.handleSubmit} className="m-2">
                    <div className="form-group row ml-3 mt-3">
                        <div className="col-1 form-check">
                            <input className="form-check-input" type="radio" name="bookingOption" id="instant" value="Instant" checked={this.state.bookingOption === "Instant"} onClick={this.onChange}/>
                        </div>
                        <div className="col-11">
                            <label className="form-check-label" for="instant">
                                <div className="row bg-warning px-1 rounded" style={{width:"7.5em"}}>Recommended</div><br/>
                                <div className="row"><h4>Instant Booking</h4></div>
                                <div className="row">
                                    <p className="text-muted">Automatically accept booking requests from all travelers for dates you have available, and add the bookings to your calendar.</p>
                                </div>
                            </label>
                        </div>
                    </div><br/>
                    <div className="form-group row ml-3 mt-3">
                        <div className="col-1 form-check">
                            <input className="form-check-input" type="radio" name="bookingOption" id="oneDayReview" value="oneDay" checked={this.state.bookingOption === "oneDay"}  onClick={this.onChange}/>
                        </div>
                        <div className="col-11">
                            <label className="form-check-label" for="oneDayReview">
                                <div className="row"><h4>24-hour review</h4></div>
                                <div className="row">
                                    <p className="text-muted">Allow 24 hours to communicate with guests and accept booking requests.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-light p-3 m-1" type="button" style={{minWidth:"150px"}} onClick={this.backHandler}>Back</button>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-primary search-button p-3 m-1" style={{minWidth:"150px"}} type="submit">Next</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    bookingOptions: state.postPropertyReducer.bookingOptions,
})

PostPropertyBookingMethod.propTypes = {
    bookingOptions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { updateBookingOptionAction })(PostPropertyBookingMethod);