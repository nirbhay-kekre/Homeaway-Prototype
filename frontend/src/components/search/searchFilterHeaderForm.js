import React, { Component } from 'react';
import './search.css'

class SearchFilterHederForm extends Component {

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.applyFilterHandler}>
                <div className="form-row w-100 bg-light mb-0">
                    <input type="number" name="oneNightRate_min" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="min price" value={this.props.oneNightRate.min} onChange={this.props.stateChangeHandler}></input>
                    <input type="number" name="oneNightRate_max" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="max price" value={this.props.oneNightRate.max} onChange={this.props.stateChangeHandler}></input>
                    <input type="number" name="bedroom_min" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="#bedroom" value={this.props.bedroom} onChange={this.props.stateChangeHandler}></input>
                    <input type="number" name="bathroom_min" className="form-control-sm my-2 mx-md-2 col-3 col-md-1" placeholder="#bathroom" value={this.props.bathroom} onChange={this.props.stateChangeHandler}></input>
                    <div className="dropdown">
                        <button className="btn btn-white bg-light form-control-xs m-1 p-auto nav-link dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Amenities</button>
                        <div className="dropdown-menu p-1" aria-labelledby="dropdownMenuButton">
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Pool" checked={this.props.amenity.indexOf("Pool") !== -1} onChange={this.props.handleAminity} />Pool</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="TV" checked={this.props.amenity.indexOf("TV") !== -1} onChange={this.props.handleAminity} />TV</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Internet" checked={this.props.amenity.indexOf("Internet") !== -1} onChange={this.props.handleAminity} />Internet</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Garden" checked={this.props.amenity.indexOf("Garden") !== -1} onChange={this.props.handleAminity} />Garden</label>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="Kitchen" checked={this.props.amenity.indexOf("Kitchen") !== -1} onChange={this.props.handleAminity} />Kitchen</label>
                                </div>
                            </li>
                        </div>
                    </div>
                    <div className="col-6 col-md-2">
                        <select className="form-control-sm m-2 profile-field" id="sort" value={this.props.sortCriteria + (this.props.sortOrder === "ASC" ? "+" : "-")} onChange={this.props.sortHandler}>
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

export default SearchFilterHederForm;