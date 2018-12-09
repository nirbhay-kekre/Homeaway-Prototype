import React, { Component } from 'react'
import { updateLocationAction } from '../../actions/postPropertyAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostPropertyLocation extends Component {
    constructor(props){
        super(props);
        this.state = {
            street: this.props.location.street,
            city: this.props.location.city,
            state: this.props.location.state,
            zip: this.props.location.zip,
            country: this.props.location.country,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateLocationAction({
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            country: this.state.country,
        },"details");
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="m-4">
                <h4 className="text-center m-4 border-bottom w-100">Verify the location of your rental</h4>
                <form onSubmit={this.handleSubmit} className="m-2">
                    <div className="form-group row">
                        <input type="text" className="form-control" id="street" name="street" value={this.state.street} placeholder="Street" onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                        <input type="text" className="form-control" id="city" name="city" value={this.state.city} placeholder="City" onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                        <input type="text" className="form-control" id="state" name="state" value={this.state.state} placeholder="State" onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="zip" name="zip" value={this.state.zip} min="10000" max="99999" titile="5 digit zip code" placeholder="zip" onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                        <input type="text" className="form-control" id="country" name="country" value={this.state.country} placeholder="Country" onChange={this.onChange} required />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary search-button p-3 m-1" style={{minWidth:"150px"}} type="submit">Next</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    location: state.postPropertyReducer.location,
})

PostPropertyLocation.propTypes = {
    location: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { updateLocationAction })(PostPropertyLocation);
