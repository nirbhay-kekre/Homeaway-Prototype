import React, { Component } from 'react';
import './login.css'
import { loginAction } from '../../actions/loginAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import ownerLoginImage from './ownerLogin.png'

class OwnerLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
        }
        this.loginHandler = this.loginHandler.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }
    componentWillMount() {
        this.setState({
            errorMessage: ""
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
                role: "owner"
            });
            this.setState({
                errorMessage: ""
            })
        }
    }

    render() {
        let redirectVar = null, invalidCredentials = null;
        let loggedInUser  = localStorage.getItem("loggedInUser");
        if (loggedInUser && localStorage.getItem("jwtToken")) {
            loggedInUser= JSON.parse(loggedInUser);
            if(loggedInUser.role==="owner" || loggedInUser.role==="both"){
                redirectVar = <Redirect to="/owner/dashboard/all" />
            }else{
                redirectVar = <Redirect to="/" />
            }
        }
        if (this.state.errorMessage ) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.state.errorMessage}</p>
        }else if (false === this.props.loginResponse.success) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.props.loginResponse.message}</p>
        }
        return (
            <div>
                {redirectVar}
                <div className='login-container'>
                    <div className='login-inner row'>
                        <div className="col-md-6 col-sm-6 hidden-xs">
                            <img align="right" src={ownerLoginImage} alt="profile"></img>
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

const mapStateToProps = (state) => ({
    loginResponse: state.loginReducer.loginResponse,
})

OwnerLogin.propTypes = {
    loginResponse: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { loginAction })(OwnerLogin);