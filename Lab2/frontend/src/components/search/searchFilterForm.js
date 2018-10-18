import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { updateSearchPropertyFilterCriteria } from './../../actions/fetchPropertyAction';
import './search.css'

class SearchFilterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oneNightRate: this.props.filters.oneNightRate,
            bedroom: this.props.filters.bedroom,
            bathroom: this.props.filters.bathroom,
            amenity: this.props.filters.amenity,
            sorting: this.props.filters.sorting
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleAminity = this.handleAminity.bind(this);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const filters = {
            ...(this.props.filters),
            ...this.state
        }
        this.props.updateSearchPropertyFilterCriteria(filters);
    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let replaceFromIndex = -1;
        if ((replaceFromIndex = name.indexOf("_min")) !== -1) {
            name = name.substring(0, replaceFromIndex);
            value = {
                ...this.state[name],
                min: e.target.value
            };
        } else if ((replaceFromIndex = name.indexOf("_max")) !== -1) {
            name = name.substring(0, replaceFromIndex);
            value = {
                ...this.state[name],
                max: e.target.value
            };
        }
        else if (name === "sorting" && value.endsWith("+")) {
            value = {
                sortCriteria: value.substring(0, value.length - 1),
                sortOrder: 1
            }
        } else if (name === "sorting" && value.endsWith("-")) {
            value = {
                sortCriteria: value.substring(0, value.length - 1),
                sortOrder: -1
            }
        }
        console.log({ name, value });
        this.setState({
            [name]: value
        });
    }

    handleAminity = (e) => {
        let amenity = [...this.state.amenity];
        if (e.target.checked) {
            amenity.push(e.target.name)
            this.setState({
                amenity
            })
        } else {
            const index = amenity.indexOf(e.target.name);
            if (index !== -1) {
                amenity.splice(index, 1);
                this.setState({
                    amenity
                })
            }
        }
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-row w-100 bg-light mb-0">
                    <input type="number" name="oneNightRate_min" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="min price" value={this.state.oneNightRate.min} onChange={this.onChange}></input>
                    <input type="number" name="oneNightRate_max" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="max price" value={this.state.oneNightRate.max} onChange={this.onChange}></input>
                    <input type="number" name="bedroom_min" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="#bedroom" value={this.state.bedroom.min} onChange={this.onChange}></input>
                    <input type="number" name="bathroom_min" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="#bathroom" value={this.state.bathroom.min} onChange={this.onChange}></input>
                    <div className="dropdown">
                        <button className="btn btn-white bg-light form-control-xs m-1 p-auto nav-link dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Amenities</button>
                        <div className="dropdown-menu p-1" aria-labelledby="dropdownMenuButton">
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Pool" checked={this.state.amenity.indexOf("Pool") !== -1} onChange={this.handleAminity} />Pool</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="TV" checked={this.state.amenity.indexOf("TV") !== -1} onChange={this.handleAminity} />TV</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Internet" checked={this.state.amenity.indexOf("Internet") !== -1} onChange={this.handleAminity} />Internet</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Garden" checked={this.state.amenity.indexOf("Garden") !== -1} onChange={this.handleAminity} />Garden</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Kitchen" checked={this.state.amenity.indexOf("Kitchen") !== -1} onChange={this.handleAminity} />Kitchen</label>
                                </div>
                            </li>
                        </div>
                    </div>
                    <div className="col-6 col-md-2">
                        <select className="form-control-sm m-2 profile-field" id="sorting" name="sorting" value={this.state.sorting.sortCriteria + (this.state.sorting.sortOrder === 1 ? "+" : "-")} onChange={this.onChange}>
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
        )
    }
}

SearchFilterForm.propTypes = {
    //filters: PropTypes.object.isRequired,
    filters: PropTypes.shape({
        city: PropTypes.string,
        arrivalDate: PropTypes.string,
        departureDate: PropTypes.string,
        accomodates: PropTypes.object,
        oneNightRate: PropTypes.object,
        bedroom: PropTypes.object,
        bathroom: PropTypes.object,
        amenity: PropTypes.array,
        sorting: PropTypes.object
    })
}

const mapStateToProps = (state) => ({
    filters: state.searchProperty.filters
})

export default connect(mapStateToProps, { updateSearchPropertyFilterCriteria })(SearchFilterForm);