import React, { Component } from 'react'

class PostPropertyAmenities extends Component {

    render() {
        return (
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Select amenities</h4>
                <p className="mx-4 text-muted">List your property's amenities (Not mandatory)</p>
                <form onSubmit={this.props.submitAmenities} className="m-2">
                    <div className="row">
                        <ul className="w-100">
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="amenity_Pool" checked={this.props.amenity.indexOf("Pool") !== -1} onChange={this.props.handleAminity} />Pool</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="amenity_TV" checked={this.props.amenity.indexOf("TV") !== -1} onChange={this.props.handleAminity} />TV</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="amenity_Internet" checked={this.props.amenity.indexOf("Internet") !== -1} onChange={this.props.handleAminity} />Internet</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="amenity_Garden" checked={this.props.amenity.indexOf("Garden") !== -1} onChange={this.props.handleAminity} />Garden</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="checkbox m-1">
                                    <label><input type="checkbox" className="mr-1" name="amenity_Kitchen" checked={this.props.amenity.indexOf("Kitchen") !== -1} onChange={this.props.handleAminity} />Kitchen</label>
                                </div>
                            </li>
                            <li className="listStyle">
                                <div className="mx-1 my-2">
                                    <input type="text" className="form-control-sm mr-1 w-100" name="other" onChange={this.props.handleOtherAminity} placeholder="Other (Enter comma separated)" value={this.props.other}></input>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-light p-3 m-1" type="button" style={{minWidth:"150px"}} onClick={this.props.backHandler}>Back</button>
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
export default PostPropertyAmenities;