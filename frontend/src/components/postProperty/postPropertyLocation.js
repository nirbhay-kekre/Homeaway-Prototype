import React, { Component } from 'react'

class PostPropertyLocation extends Component {
    render() {
        return (
            <div className="m-4">
                <h4 className="text-center m-4 border-bottom w-100">Verify the location of your rental</h4>
                <form onSubmit={this.props.submitLocation} className="m-2">
                    <div className="form-group row">
                        <input type="text" className="form-control" id="street" name="street" value={this.props.street} placeholder="Street" onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="form-group row">
                        <input type="text" className="form-control" id="city" name="city" value={this.props.city} placeholder="City" onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="form-group row">
                        <input type="text" className="form-control" id="state" name="state" value={this.props.state} placeholder="State" onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="zip" name="zip" value={this.props.zip} min="10000" max="99999" titile="5 digit zip code" placeholder="zip" onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="form-group row">
                        <input type="text" className="form-control" id="country" name="country" value={this.props.country} placeholder="Country" onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary search-button p-3 m-1" style={{minWidth:"150px"}} type="submit">Next</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default PostPropertyLocation;