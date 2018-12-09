import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../login/login.css'
import { Redirect } from 'react-router';
import { signupAction } from './../../actions/signupAction';
import { loginAction } from './../../actions/loginAction';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            success: null,
            message: "",
            loggedin: false,
        }
        this.signUpHandler = this.signUpHandler.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    signUpHandler = async (e) => {
        e.preventDefault();
        await this.props.signupAction({
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        });
        this.props.loginAction({
            username: this.state.username,
            password: this.state.password,
            role: "traveler"
        })
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("Signup received props:", {props: this.props, nextProps});
        if (this.props.signupResponse !== nextProps.signupResponse) {
            this.setState({
                ...nextProps.signupResponse
            });
        }
        if(this.props.loginResponse != nextProps.loginResponse){
            console.log({loginSuccess: nextProps.loginResponse.success})
            this.setState({
                loggedin: nextProps.loginResponse.success
            });
        }
    }

    render() {
        console.log("redering", {state: this.state})
        let redirectVar = null, invalidData = null;
        if (this.state.success && this.state.loggedin) {
            redirectVar = <Redirect to="/welcome" />
        } else if (this.state.message && this.state.success === false) {
            invalidData = <p className="alert alert-danger error-message">{this.state.message}</p>
        }
        return (
            <div className='login-container'>
                {redirectVar}
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
                                                <input type="text" className="form-control credential" id="firstname" name="firstname" aria-describedby="firstname" placeholder="First Name" onChange={this.onChange} value={this.state.firstname} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <input type="text" className="form-control credential" id="lastname" name="lastname" aria-describedby="lastname" placeholder="Last Name" onChange={this.onChange} value={this.state.lastname} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control credential" id="username" name="username" aria-describedby="username" placeholder="Email address" onChange={this.onChange} value={this.state.username} />
                                        </div>
                                        <div className="form-group ">
                                            <input type="password" className="form-control credential" id="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password} />
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
        );
    }
}


const mapStateToProps = (state) => ({
    signupResponse: state.signupReducer.signupResponse,
    loginResponse: state.loginReducer.loginResponse,
})

Signup.propTypes = {
    signupResponse: PropTypes.object.isRequired,
    loginResponse: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { signupAction, loginAction })(Signup);