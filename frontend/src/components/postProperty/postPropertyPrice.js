import React, { Component } from 'react'

class PostPropertyPrice extends Component{

    render(){
        return(
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Describe your property</h4>
                <p className="mx-4 text-muted">Start out with a descriptive headline and a detailed summary of your property.</p>
                <form onSubmit={this.props.submitPrice} className="m-2">
                    <div className="form-group row">
                        <input type="number" className="form-control" id="oneNightRate" name="oneNightRate" value={this.props.oneNightRate} placeholder="Nightly base rate" min="0" onChange={this.props.stateChangeHandler} required />
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control" id="minNightStay" name="minNightStay" value={this.props.minNightStay} placeholder="Minimum night stay" min="1"  onChange={this.props.stateChangeHandler} required />
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
export default PostPropertyPrice;