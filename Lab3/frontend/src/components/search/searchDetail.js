import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ImageSlider from './imageSlider'
import { fetchPropertyDetail } from './../../actions/fetchPropertyAction';
import { bookPropertyAction } from './../../actions/bookPropertyAction';
import { sendMessageAction } from '../../actions/sendMessageAction'
import Proxy from '../proxy/proxy';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SearchDetail extends Component {

    constructor(props) {
        super(props);
        this.formatDate = this.formatDate.bind(this);
        this.state = {
            arrivalDate: this.props.location.state.arrivalDate || this.formatDate(new Date()),
            departureDate: this.props.location.state.departureDate || this.formatDate(new Date()),
            accomodates: this.props.location.state.accomodates_min || 1,
            errorMessage: "",
            success: null,
            open: false,
            questionToOwner: ""
        };

        this.onChange = this.onChange.bind(this);
        this.cancelMessage = this.cancelMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage = async () => {

        try {
            let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (this.state.questionToOwner) {
                const params = {
                    propertyId: this.props.location.state.propertyId,
                    owner: this.props.result.owner,
                    traveler: loggedInUser.username,
                    headline: this.props.result.headline,
                    from: loggedInUser.username,
                    to: this.props.result.owner,
                    message: this.state.questionToOwner
                }
                await this.props.sendMessageAction(params);
                this.setState({
                    questionToOwner: "",
                    open: !this.state.open
                })
            }
        } catch (error) {
            this.setState({
                open: !this.state.open
            })
        }

    }
    cancelMessage = () => {
        this.setState({
            questionToOwner: "",
            open: !this.state.open
        })
    }
    handleHide() {
        this.setState({
            open: !this.state.open
        })
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
    handleShow() {
        this.setState({
            open: true
        });
    }
    bookNowHandler = async (e) => {
        e.preventDefault();
        try {
            let response = await this.props.bookPropertyAction({
                propertyId: this.props.location.state.propertyId,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate,
                guests: this.state.accomodates,
                amountPaid: this.props.result.totalPrice
            });
            this.setState({
                errorMessage: "",
                success: true,
            });
        } catch (error) {
            this.setState({
                errorMessage: error,
                success: false
            });
        }
    }

    render() {
        let feedbackMessage = null;
        if (this.state.success) {
            feedbackMessage = <div className="alert alert-success alert-dismissible row" role="alert">
                <div className="col-xs-2"><i className="material-icons">check_circle</i></div>
                <div className="col-xs-8 ml-2">
                    <strong>Success!</strong><br />
                    Booking is successful
                </div>
                <div className="col-xs-2"><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        } else if (this.state.success === false && this.state.errorMessage) {
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
                <Proxy />
                <form className="form-horizontal" onSubmit={this.bookNowHandler}>
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
                                                    <input type='date' className="w-100 text-center" name="arrivalDate" onChange={this.onChange} max={this.state.departureDate} value={this.state.arrivalDate} required></input>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <small className="w-100 text-center text-muted">Check Out</small>
                                                </div>
                                                <div className="row">
                                                    <input type='date' className="w-100 text-center" name="departureDate" onChange={this.onChange} min={this.state.arrivalDate} value={this.state.departureDate} required></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row border">
                                            <div className="col-12">
                                                <div className="row">
                                                    <small className="w-100 text-center text-muted">guests</small>
                                                </div>
                                                <div className="row">
                                                    <input type="number" className="w-100 text-center" name="accomodates" onChange={this.onChange} min="1" value={this.state.accomodates} required />
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
                                    <button className="btn btn-primary search-button w-100 p-3 m-1" type="submit">Book Now</button>
                                </div>
                                <div className="row m-4">
                                    <button type="button" className="btn btn-primary search-button w-100 p-3 m-1" onClick={this.handleHide.bind(this)}>
                                        Ask owner a Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <Modal backdrop={true} isOpen={this.state.open} toggle={this.handleHide.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.handleHide.bind(this)}>Ask owner a question</ModalHeader>
                    <ModalBody>
                        <div>
                            <textarea name="questionToOwner" value={this.state.questionToOwner} onChange={this.onChange} className="form-control" rows="5" style={{ resize: "none", }} placeholder="Message"></textarea>
                        </div>
                    </ModalBody>
                    <ModalFooter className="row">
                        <Button color="primary" className="col-3 float-right" onClick={this.sendMessage.bind(this)}>Send</Button>{' '}
                        <Button color="dark" className="col-3 float-left text-white" onClick={this.cancelMessage.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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
export default connect(mapStateToProps, { fetchPropertyDetail, bookPropertyAction, sendMessageAction })(SearchDetail);