import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import { loginAction } from '../../actions/loginAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.loginHandler = this.loginHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = (e) => {
        console.log({
            [e.target.name]: e.target.value
        });
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    loginHandler = async (e) => {
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
                errorMessage: msg
            })
        }
        else {
            await this.props.loginAction({
                username: this.state.username,
                password: this.state.password,
                role: "traveler"
            });
            this.setState({
                errorMessage: ""
            })
        }
    }

    render() {
        let invalidCredentials = null;
        if (this.state.errorMessage) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.state.errorMessage}</p>
        } else if (false === this.props.loginResponse.success) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.props.loginResponse.message}</p>
        }
        return (
            <div className='login-container'>
                {localStorage.getItem("jwtToken") ? <Redirect to="/" /> : ""}
                <div className='login-inner'>
                    <div className="login-header text-center col-md-12 traveler">
                        <h1 >Log in to HomeAway</h1>
                    </div>
                    <div>
                        <span className="signup">Need an account?</span>
                        <Link to="/signup" className="link">Sign up</Link>
                    </div>
                    <div className="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12 login-dashboard">
                        <div className="login-pannel">

                            <div className="pannel-header"><p>Account login</p></div>
                            <div className="pannel-body">

                                <form className="login-form" onSubmit={this.loginHandler}>
                                    <fieldset>
                                        <div>{invalidCredentials}</div>
                                        <div className="form-group">
                                            <input type="email" className="form-control credential" name="username" aria-describedby="username" placeholder="Email address" onChange={this.onChangeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control credential" name="password" placeholder="Password" onChange={this.onChangeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <a href="#" className="link" style={{ float: "left", fontSize: "14px" }}>Forgot password?</a>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary login-button">Submit</button>
                                        </div>
                                        <div className="form-check login-checkBox">
                                            <input type="checkbox" className="form-check-input" id="Remember" />
                                            <label className="form-check-label" htmlFor="Remember">Remember me</label>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    loginResponse: state.loginReducer.loginResponse,
})

Login.propTypes = {
    loginResponse: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { loginAction })(Login);