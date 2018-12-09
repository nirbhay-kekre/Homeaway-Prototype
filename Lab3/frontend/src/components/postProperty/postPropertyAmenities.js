import React, { Component } from 'react'
import { updateAmenitiesAction } from '../../actions/postPropertyAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class PostPropertyAmenities extends Component {

    constructor(props) {
        super(props);
        this.handleAminity = this.handleAminity.bind(this);
        this.handleOtherAminity = this.handleOtherAminity.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.state = {
            amenity: this.props.amenities.amenity,
            other: this.props.amenities.other
        }
    }

    backHandler = (e) => {
        e.preventDefault();
        this.props.updateAmenitiesAction(this.state, "photos");
    }


    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.updateAmenitiesAction(this.state, "pricing");
    }

    handleOtherAminity = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleAminity = (e) => {
        let amenity = (this.state.amenity).slice();

        if (e.target.checked) {
            amenity.push(e.target.name);
        }
        else {
            const index = amenity.indexOf(e.target.name);
            if (index != -1) {
                amenity.splice(index, 1);
            }
        }
        this.setState({
            amenity
        });
    }

    render() {
        return (
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Select amenities</h4>
                <p className="mx-4 text-muted">List your property's amenities (Not mandatory)</p>
                <form onSubmit={this.handleSubmit} className="m-2">
                    <div className="row">
                        <ul className="w-100">
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Pool" checked={this.state.amenity.indexOf("Pool") !== -1} onChange={this.handleAminity} />Pool</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="TV" checked={this.state.amenity.indexOf("TV") !== -1} onChange={this.handleAminity} />TV</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Internet" checked={this.state.amenity.indexOf("Internet") !== -1} onChange={this.handleAminity} />Internet</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Garden" checked={this.state.amenity.indexOf("Garden") !== -1} onChange={this.handleAminity} />Garden</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Kitchen" checked={this.state.amenity.indexOf("Kitchen") !== -1} onChange={this.handleAminity} />Kitchen</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="mx-1 my-2">
                                    <input type="text" className="form-control-sm mr-1 w-100" name="other" onChange={this.handleOtherAminity} placeholder="Other (Enter comma separated)" value={this.state.other}></input>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-light p-3 m-1" type="button" style={{ minWidth: "150px" }} onClick={this.backHandler}>Back</button>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-primary search-button p-3 m-1" style={{ minWidth: "150px" }} type="submit">Next</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    amenities: state.postPropertyReducer.amenities,
})

PostPropertyAmenities.propTypes = {
    amenities: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { updateAmenitiesAction })(PostPropertyAmenities);