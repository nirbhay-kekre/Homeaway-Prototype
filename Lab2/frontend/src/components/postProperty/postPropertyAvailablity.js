import React, { Component } from 'react'
import { updateAvailabilityAction, submitPropertyAction } from '../../actions/postPropertyAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostPropertyAvailibility extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isComplete = this.isComplete.bind(this);
        this.validateAllPhotosAvailable = this.validateAllPhotosAvailable.bind(this);
        this.checkIncompleteTabs = this.checkIncompleteTabs.bind(this);
        this.populateFormData = this.populateFormData.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.state = {
            startDate: this.props.availablity.startDate,
            endDate: this.props.availablity.endDate,
            error: ""
        }
    }

    isComplete = (obj) => {
        let keys = Object.keys(obj);
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
    checkIncompleteTabs = () => {
        let inComplete = [];
        if (!this.isComplete(this.props.location)) {
            inComplete.push("location");
        }
        if (!this.isComplete(this.props.details)) {
            inComplete.push("details");
        }
        if (!this.isComplete(this.props.bookingOptions)) {
            inComplete.push("bookingOptions");
        }
        if (!this.isComplete(this.props.pricing)) {
            inComplete.push("pricing");
        }
        if (!this.isComplete({
            startDate: this.state.startDate,
            endDate: this.state.endDate
        })) {
            inComplete.push("availablity");
        }

        return (inComplete.length > 0 ? inComplete : false)
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.updateAvailabilityAction({
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
        let errors = this.checkIncompleteTabs();
        if (errors) {
            this.setState({
                error: `Please populate ${errors.join(", ")} tab${errors.length == 1 ? "" : "s"}`
            })
        } else {
            try {
                let response = await this.props.submitPropertyAction(this.getFormData());
                // this.props.history.push("/owner/dashboard/all");
            } catch (error) {
                this.setState({
                    error: "Something went wrong"
                })
            }
        }
    }

    getFormData = () => {
        const fdata = new FormData();
        this.populateFormData(fdata, this.props.location);
        this.populateFormData(fdata, this.props.details);
        this.populateFormData(fdata, this.props.bookingOptions);
        this.populateFormData(fdata, this.props.pricing);
        let amenities = this.props.amenities.amenity.slice()
        if (this.props.amenities.other) {
            amenities.push(...this.props.amenities.other.split(",").map(i => i.trim()))
        }
        fdata.append("amenities",JSON.stringify(amenities));
        fdata.append("availability",JSON.stringify([{
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }]));
        for (let i=0; i<this.props.photos.propertyPhoto.length;i++){
            fdata.append("picture"+i, this.props.photos.propertyPhoto[i])
        }
        return fdata;
    }

    populateFormData = (fdata, obj) => {
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            fdata.append(keys[i], obj[keys[i]]);
        }

    }

    backHandler = (e) => {
        e.preventDefault();
        this.props.updateAvailabilityAction({
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }, "pricing");
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <div className="alert alert-danger alert-dismissible row m-2" role="alert">
                <div className="col-1"><i className="material-icons">warning</i></div>
                <div className="col-11">
                    {this.state.error}
                </div>
                <div><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }
        return (
            <div className="m-4">
                {errorMessage}
                <h4 className="text-left m-4 border-bottom w-100">Availability</h4>
                <p className="mx-4 text-muted">Please specify when your property is available</p>
                <form onSubmit={this.handleSubmit} className="m-2">
                    <div className="form-group row">
                        <label for="startDate" className="col-2 col-form-label py-4 pr-0">Availabile from</label>
                        <div className="col-10">
                            <input type="date" className="form-control" id="startDate" name="startDate" value={this.state.startDate} max={this.state.endDate} onChange={this.onChange} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="endDate" className="col-2 col-form-label py-4 pr-0">Availabile till</label>
                        <div className="col-10">
                            <input type="date" className="form-control" id="endDate" name="endDate" value={this.state.endDate} min={this.state.startDate} onChange={this.onChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-light p-3 form-control m-1" type="button" onClick={this.backHandler}>Back</button>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-primary search-button p-3 form-control m-1" type="submit">Post property</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.postPropertyReducer.location,
    details: state.postPropertyReducer.details,
    bookingOptions: state.postPropertyReducer.bookingOptions,
    pricing: state.postPropertyReducer.pricing,
    availablity: state.postPropertyReducer.availablity,
    photos: state.postPropertyReducer.photos,
    amenities: state.postPropertyReducer.amenities,
})

PostPropertyAvailibility.propTypes = {
    location: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
    bookingOptions: PropTypes.object.isRequired,
    pricing: PropTypes.object.isRequired,
    availablity: PropTypes.object.isRequired,
    photos: PropTypes.object.isRequired,
    amenities: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { updateAvailabilityAction, submitPropertyAction })(PostPropertyAvailibility);