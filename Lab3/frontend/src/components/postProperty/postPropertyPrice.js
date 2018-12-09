import React, { Component } from 'react'
import { updatePriceAction } from '../../actions/postPropertyAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostPropertyPrice extends Component{

    constructor(props){
        super(props);
        this.state = {
            oneNightRate: this.props.pricing.oneNightRate,
            minNightStay: this.props.pricing.minNightStay,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.updatePriceAction({
            oneNightRate: this.state.oneNightRate,
            minNightStay: this.state.minNightStay
        }, "availablity")
    }

    backHandler = (e) => {
        e.preventDefault();
        this.props.updatePriceAction({
            oneNightRate: this.state.oneNightRate,
            minNightStay: this.state.minNightStay
        }, "amenities");
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render(){
        return(
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Describe your property</h4>
                <p className="mx-4 text-muted">Start out with a descriptive headline and a detailed summary of your property.</p>
                <form onSubmit={this.handleSubmit} className="m-2">
                    <div className="form-group row">
                        <input type="number" className="form-control" id="oneNightRate" name="oneNightRate" value={this.state.oneNightRate} placeholder="Nightly base rate" min="0" onChange={this.onChange} required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="minNightStay" name="minNightStay" value={this.state.minNightStay} placeholder="Minimum night stay" min="1"  onChange={this.onChange} required />
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
    pricing: state.postPropertyReducer.pricing,
})

PostPropertyPrice.propTypes = {
    pricing: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { updatePriceAction })(PostPropertyPrice);