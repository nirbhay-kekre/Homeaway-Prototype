import React, { Component } from 'react'

class PostPropertyAvailibility extends Component {

    render() {
        return (
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Availability</h4>
                <p className="mx-4 text-muted">Please specify when your property is available</p>
                <form onSubmit={this.props.submitAvailablity} className="m-2">
                    <div className="form-group row">
                        <label for="startDate" className="col-2 col-form-label py-4 pr-0">Availabile from</label>
                        <div className="col-10">
                            <input type="date" className="form-control" id="startDate" name="startDate" value={this.props.startDate} max={this.props.endDate} onChange={this.props.stateChangeHandler} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="endDate" className="col-2 col-form-label py-4 pr-0">Availabile till</label>
                        <div className="col-10">
                            <input type="date" className="form-control" id="endDate" name="endDate" value={this.props.endDate} min={this.props.startDate} onChange={this.props.stateChangeHandler} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-light p-3 form-control m-1" type="button" onClick={this.props.backHandler}>Back</button>
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
export default PostPropertyAvailibility;