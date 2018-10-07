import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from './../nav/navbar';

class ChangeOwnership extends Component {

    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);
        this.continue = this.continue.bind(this);
        this.state = {
            redirectTo: null,
            forceReloadOnServerAuthFailureToggle: true
        }
    }

    cancel = (e) => {
        e.preventDefault();
        this.setState({
            redirectTo: "/"
        });
    }

    continue = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:3001/makeMeOwner").then(response => {
            this.setState({
                redirectTo: "/owner/dashboard/post"
            });
        }).catch(error => {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            }
            else if (error.response.status === 401) {
                cookie.remove("cookie");
                this.setState({
                    forceReloadOnServerAuthFailureToggle: !this.state.forceReloadOnServerAuthFailureToggle
                })
            }
        });
        return false
    }

    render() {
        let redirectVar = null;
        let localCookie = cookie.load('cookie');
        localCookie = JSON.parse(localCookie.substring(2, localCookie.length));
        if (!localCookie) {
            redirectVar = <Redirect to="/login"></Redirect>
        } else if (localCookie["role"] === "owner" || localCookie["role"] === "both") {
            redirectVar = <Redirect to="/owner/dashboard/post" />
        } else if (this.state.redirectTo) {
            redirectVar = <Redirect to={this.state.redirectTo}></Redirect>
        }

        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
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

export default ChangeOwnership;