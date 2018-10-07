import React, { Component } from 'react'
class PostPropertyDetail extends Component {

    render() {
        return (
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Describe your property</h4>
                <p className="mx-4 text-muted">Start out with a descriptive headline and a detailed summary of your property.</p>
                <form onSubmit={this.props.submitDetail} className="m-2">
                    <div className="form-group row">
                        <input type="text" className="form-control" id="headline" name="headline" value={this.props.headline} placeholder="Headline" maxLength="255"  onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="form-group row">
                        <textarea type="text" className="form-control" id="propertyDescription" name="propertyDescription" value={this.props.propertyDescription} placeholder="Property description" maxLength="255" rows="5"  onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="form-group row">
                        <select className="form-control" id="propertyType" name="propertyType" value={this.props.propertyType} onChange={this.props.stateChangeHandler} >
                            <option disabled="" hidden="" value="">Property type</option>
                            <option value="Apartment">Appartment</option>
                            <option value="House">House</option>
                            <option value="Studio">Studio</option>
                            <option value="Farmhouse">Farmhouse</option>
                            <option value="Resort">Resort</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="bedroom" name="bedroom" value={this.props.bedroom} min="0" titile="#bedroom" placeholder="Bedroom" onChange={this.props.stateChangeHandler}  required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="bathroom" name="bathroom" value={this.props.bathroom} min="0" titile="#bathroom" placeholder="Bathroom" onChange={this.props.stateChangeHandler}  required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="accomodates" name="accomodates" value={this.props.accomodates} min="1" titile="#accomodates" placeholder="Accomodates" onChange={this.props.stateChangeHandler}  required />
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
export default PostPropertyDetail;