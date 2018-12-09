import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { changeOwnershipAction } from '../../actions/changeOwnershipAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class ChangeOwnership extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
            forceReloadOnServerAuthFailureToggle: true
        }
        this.cancel = this.cancel.bind(this);
        this.continue = this.continue.bind(this);
    }

    cancel = (e) => {
        e.preventDefault();
        this.setState({
            redirectTo: "/"
        });
    }

    continue = async (e) => {
        e.preventDefault();
        await this.props.changeOwnershipAction();
    }

    render() {
        let redirectVar = null;
        let loggedInUser  = localStorage.getItem("loggedInUser");
        if(loggedInUser){
            loggedInUser= JSON.parse(loggedInUser);
        }
        if (!localStorage.getItem("jwtToken") || !loggedInUser) {
            redirectVar = <Redirect to="/login"></Redirect>
        } else if (loggedInUser.role === "owner" || loggedInUser.role === "both") {
            redirectVar = <Redirect to="/owner/dashboard/post" />
        } else if (this.state.redirectTo) {
            redirectVar = <Redirect to={this.state.redirectTo}></Redirect>
        }

        return (
            <div>
                {redirectVar}
                <form onSubmit={this.continue}>
                    <div className="container-flex bg-light p-5">
                        <div className="container bg-white p-5">
                            <div className="row">
                                <h3 className="text-center w-100"> Do you want to be an Owner?</h3>
                            </div>
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center">
                                    <button className="btn btn-light p-3 m-1" type="button" style={{ minWidth: "150px" }} onClick={this.cancel}>Cancel</button>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <button className="btn btn-primary search-button p-3 m-1" style={{ minWidth: "150px" }} type="submit">Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    loginResponse: state.loginReducer.loginResponse,
})

ChangeOwnership.propTypes = {
    loginResponse: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { changeOwnershipAction })(ChangeOwnership);