import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../nav/navbar';
import axios from 'axios'
import './login.css'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import ownerLoginImage from './ownerLogin.png'

class OwnerLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            authFlag: false,
            isLoginAttempted: false
        }
        this.loginHandler = this.loginHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }
    componentWillMount() {
        this.setState({
            authFlag: false,
            message: null
        })
    }
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    loginHandler = (e) => {
        e.preventDefault();
        let msg = "";
        if (!this.state.username) {
            msg += "Email Address is a required field.\n"
        }
        if (!this.state.password) {
            msg += "Password is a required field.\n"
        }
        if (msg) {
            this.setState({
                isLoginAttempted: true,
                authFlag: false,
                errorMessage: msg
            })
        }
        else {
            axios.defaults.withCredentials = true;
            axios.post("http://localhost:3001/login",{
                    username: this.state.username,
                    password: this.state.password,
                    role: "owner"
            }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        errorMessage: "",
                        isLoginAttempted: true,
                    })
                }
            }, error => {
                if(error.message === "Network Error"){
                    this.setState({
                        authFlag: false,
                        errorMessage: "Server is not running, try again later",
                        isLoginAttempted: true,
                    })
                }
                else if (error.response.status === 401 || error.response.status === 500) {
                    this.setState({
                        authFlag: false,
                        errorMessage: error.response.data.message,
                        isLoginAttempted: true,
                    })
                }
            })
        }
    }

    render() {
        let redirectVar = null, invalidCredentials = null;
        let localCookie=cookie.load('cookie');
        if (localCookie) {
            localCookie = JSON.parse(localCookie.substring(2,localCookie.length));
            if(localCookie.role=="owner" || localCookie.role=="both"){
                redirectVar = <Redirect to="/owner/dashboard" />
            }else{
                redirectVar = <Redirect to="/" />
            }
        }
        if (this.state.errorMessage && this.state.isLoginAttempted && !this.state.authFlag) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.state.errorMessage}</p>
        }
        return (
            <div>
                {redirectVar}
                <Navbar logo="blue"></Navbar>
                <div className='login-container'>
                    <div className='login-inner row'>
                        <div className="col-md-6 col-sm-6 hidden-xs">
                            <img align="right" src={ownerLoginImage}></img>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
                            <div className="login-pannel">
                                <div className="pannel-header"><p>Owner login</p></div>
                                <div className="pannel-body">  
                                    <form className="login-form" onSubmit={this.loginHandler}>
                                        <fieldset>
                                            <div>{invalidCredentials}</div>
                                            <div className="form-group">
                                                <input type="email" className="form-control credential" id="username" aria-describedby="username" placeholder="Email address" onChange={this.usernameChangeHandler} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control credential" id="password" placeholder="Password" onChange={this.passwordChangeHandler} />
                                            </div>
                                            <div className="forn-group">
                                                <a href="#" className="link" style={{ float: "left", fontSize: "14px" }}>Forgot password?</a>
                                            </div>
                                            <div className="forn-group">
                                                <button type="submit" className="btn btn-primary login-button">Submit</button>
                                            </div>
                                            <div className="form-check login-checkBox">
                                                <input type="checkbox" className="form-check-input" id="Remember" />
                                                <label className="form-check-label" htmlFor="Remember">Keep me signed in</label>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OwnerLogin;