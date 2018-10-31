import React, { Component } from 'react';
import { updateDetailsAction } from '../../actions/postPropertyAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostPropertyDetail extends Component {

    constructor(props){
        super(props);
        this.state ={
            headline: this.props.details.headline,
            propertyDescription: this.props.details.propertyDescription,
            propertyType: this.props.details.propertyType,
            bedroom: this.props.details.bedroom,
            bathroom: this.props.details.bathroom,
            accomodates: this.props.details.accomodates,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateDetailsAction({
            headline: this.state.headline,
            propertyDescription: this.state.propertyDescription,
            propertyType: this.state.propertyType,
            bedroom: this.state.bedroom,
            bathroom: this.state.bathroom,
            accomodates: this.state.accomodates,
        },"bookingOptions");
    }

    backHandler = (e) => {
        e.preventDefault();
         this.props.updateDetailsAction({
            headline: this.state.headline,
            propertyDescription: this.state.propertyDescription,
            propertyType: this.state.propertyType,
            bedroom: this.state.bedroom,
            bathroom: this.state.bathroom,
            accomodates: this.state.accomodates,
        }, "location");
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Describe your property</h4>
                <p className="mx-4 text-muted">Start out with a descriptive headline and a detailed summary of your property.</p>
                <form onSubmit={this.handleSubmit} className="m-2">
                    <div className="form-group row">
                        <input type="text" className="form-control" id="headline" name="headline" value={this.state.headline} placeholder="Headline" maxLength="255"  onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                        <textarea type="text" className="form-control" id="propertyDescription" name="propertyDescription" value={this.state.propertyDescription} placeholder="Property description" maxLength="255" rows="5"  onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                        <select className="form-control" id="propertyType" name="propertyType" value={this.state.propertyType} onChange={this.onChange} >
                            <option disabled="" hidden="" value="">Property type</option>
                            <option value="Apartment">Appartment</option>
                            <option value="House">House</option>
                            <option value="Studio">Studio</option>
                            <option value="Farmhouse">Farmhouse</option>
                            <option value="Resort">Resort</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="bedroom" name="bedroom" value={this.state.bedroom} min="0" titile="#bedroom" placeholder="Bedroom" onChange={this.onChange}  required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="bathroom" name="bathroom" value={this.state.bathroom} min="0" titile="#bathroom" placeholder="Bathroom" onChange={this.onChange}  required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="accomodates" name="accomodates" value={this.state.accomodates} min="1" titile="#accomodates" placeholder="Accomodates" onChange={this.onChange}  required />
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
    details: state.postPropertyReducer.details,
})

PostPropertyDetail.propTypes = {
    details: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { updateDetailsAction })(PostPropertyDetail);