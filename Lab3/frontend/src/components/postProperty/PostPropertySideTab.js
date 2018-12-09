import React, { Component } from 'react'
import { changeTab } from '../../actions/postPropertyAction'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostPropertySideTab extends Component {
    constructor(props) {
        super(props);
        this.isComplete = this.isComplete.bind(this);
        this.validateAllPhotosAvailable = this.validateAllPhotosAvailable.bind(this);
    }

    onClick = (e) => {
        e.preventDefault();
        this.props.changeTab(e.target.name);
    }

    isComplete = (obj) => {
        let keys = Object.keys(obj);
        let missingFields = []
        for (let i = 0; i < keys.length; i++) {
            if (typeof obj[keys[i]] === "string" && obj[keys[i]] === "") {
                return false;
            }
        }
        return true;
    }

    validateAllPhotosAvailable = () => {
        if (this.props.photos.propertyPhoto.length >= 2 && this.props.photos.propertyPhoto.length < 6) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <ul className="nav flex-column">
                <li className="nav-item">
                    <p className="nav-link">Welcome</p>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "location" ? " text-white bg-primary disabled" : "")} name="location" onClick={this.onClick} to="#">Location {this.isComplete(this.props.location) ? <i class="material-icons text-success float-right">
                        done
                    </i>
                        : ""
                    }</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "details" ? " text-white bg-primary disabled" : "")} name="details" onClick={this.onClick} to="#">Details {this.isComplete(this.props.details) ? <i class="material-icons text-success float-right">
                        done
                    </i>
                        : ""
                    }</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "bookingOptions" ? " text-white bg-primary disabled" : "")} name="bookingOptions" onClick={this.onClick} to="#">Booking Options {this.isComplete(this.props.bookingOptions) ? <i class="material-icons text-success float-right">
                        done
                    </i>
                        : ""
                    }</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "photos" ? " text-white bg-primary disabled" : "")} name="photos" onClick={this.onClick} to="#">Photos {this.validateAllPhotosAvailable() ? <i class="material-icons text-success float-right">
                        done
                    </i>
                        : ""
                    }</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "amenities" ? " text-white bg-primary disabled" : "")} name="amenities" onClick={this.onClick} to="#">Amenities (optional)</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "pricing" ? " text-white bg-primary disabled" : "")} name="pricing" onClick={this.onClick} to="#">Pricing {this.isComplete(this.props.pricing) ? <i class="material-icons text-success float-right">
                        done
                    </i>
                        : ""
                    }</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link" + (this.props.currentTab === "availablity" ? " text-white bg-primary disabled" : "")} name="availablity" onClick={this.onClick} to="#">Availablity {this.isComplete(this.props.availablity) ? <i class="material-icons text-success float-right">
                        done
                    </i>
                        : ""
                    }</Link>
                </li>
            </ul>
        )
    }
}


const mapStateToProps = (state) => ({
    currentTab: state.postPropertyReducer.currentTab,
    location: state.postPropertyReducer.location,
    details: state.postPropertyReducer.details,
    bookingOptions: state.postPropertyReducer.bookingOptions,
    pricing: state.postPropertyReducer.pricing,
    availablity: state.postPropertyReducer.availablity,
    photos: state.postPropertyReducer.photos
})

PostPropertySideTab.propTypes = {
    currentTab: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
    bookingOptions: PropTypes.object.isRequired,
    pricing: PropTypes.object.isRequired,
    availablity: PropTypes.object.isRequired,
    photos: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { changeTab })(PostPropertySideTab);