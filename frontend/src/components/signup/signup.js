import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../nav/navbar';
import axios from 'axios'
import './../login/login.css'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            errorMessage: "",
            success: false
        }
        this.signUpHandler = this.signUpHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    }
    componentWillMount() {
        this.setState({
            success: false,
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

    firstnameChangeHandler = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }
    lastnameChangeHandler = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }


    signUpHandler = (e) => {
        e.preventDefault();
        let msg = "";
        if (!this.state.username) {
            msg += "An Email address is required.\n"
        }
        if (!this.state.password) {
            msg += "A Password is required.\n"
        } else {
            if (!this.state.password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{1,}$/)) {
                msg += "Your Password must contain at least 1 number and 1 letter.\n"
            }
            if(!this.state.password.match(/^.{7,32}$/)){
                msg+="Your Password must be between 7 and 32 characters.\n"
            }
        }
        if (!this.state.firstname) {
            msg+="First name is required.\n"
        }
        if (!this.state.lastname) {
            msg+="Last name is required.\n"
        }
        if (msg) {
            this.setState({
                success: false,
                isSignUpAttempted: true,
                errorMessage: msg
            })
        }
        else {
            axios.defaults.withCredentials = true;
            axios.post("http://localhost:3001/signup", {
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname
            }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        success: true,
                        errorMessage: "",
                        isSignUpAttempted: true,
                    })
                }
            }, error => {
                if (error.message === "Network Error") {
                    this.setState({
                        success: false,
                        errorMessage: "Server is not running, try again later",
                        isSignUpAttempted: true,
                    })
                }
                else if (error.response.status === 400 || error.response.status === 500 || error.response.status === 409) {
                    this.setState({
                        success: false,
                        errorMessage: error.response.data.message,
                        isSignUpAttempted: true,
                    })
                }
            })
        }
    }

    render() {
        let redirectVar = null, invalidData = null;
        if (this.state.success) {
            redirectVar = <Redirect to="/welcome" />
        }else if (this.state.errorMessage && this.state.isSignUpAttempted) {
            invalidData = <p className="alert alert-danger error-message">{this.state.errorMessage}</p>
        }
        return (
            <div>
                {redirectVar}
                <Navbar logo="blue"></Navbar>
                <div className='login-container'>
                    <div className='login-inner'>
                        <div className="login-header text-center col-md-12 traveler">
                            <h1 >Sign up for HomeAway</h1>
                        </div>
                        <div>
                            <span className="signup">Already have an account?</span>
                            <Link to="/login" className="link">Log in</Link>
                        </div>
                        <div className="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 login-dashboard">
                            <div className="login-pannel">
                                <div className="pannel-body">
                                    <form className="login-form" onSubmit={this.signUpHandler}>
                                        <fieldset>
                                            <div>{invalidData}</div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <input type="text" className="form-control credential" id="firstname" aria-describedby="firstname" placeholder="First Name" onChange={this.firstnameChangeHandler} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <input type="text" className="form-control credential" id="lastname" aria-describedby="lastname" placeholder="Last Name" onChange={this.lastnameChangeHandler} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control credential" id="username" aria-describedby="username" placeholder="Email address" onChange={this.usernameChangeHandler} />
                                            </div>
                                            <div className="form-group ">
                                                <input type="password" className="form-control credential" id="password" placeholder="Password" onChange={this.passwordChangeHandler} />
                                            </div>

                                            <div className="forn-group">
                                                <button type="submit" className="btn btn-primary login-button">Sign Me Up</button>
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

export default Signup;