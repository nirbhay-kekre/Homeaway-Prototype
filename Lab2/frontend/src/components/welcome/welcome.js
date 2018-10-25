import React, { Component } from 'react';
import './../login/login.css'
import anonymosPhoto from './anonymous.png'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import './welcome.css'

class Welcome extends Component {
    render() {
        let name = "", localCookie = cookie.load('cookie'), redirectVar = null
        if (!localCookie) {
            redirectVar = <Redirect to="/login" />
        } else {
            localCookie = JSON.parse(localCookie.substring(2, localCookie.length));
            name = localCookie["firstname"] + " " + localCookie["lastname"];
        }
        return (
            <div className='login-container'>
                {redirectVar}
                <div className='login-inner'>
                    <div className="login-header text-center col-md-12 traveler">
                        <h1 >Thank you for creating an account</h1>
                    </div>

                    <div className="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 login-dashboard">
                        <div className="login-pannel">
                            <div className="pannel-header"><p style={{ textAlign: "center" }}>Welcome <strong>{name}</strong></p></div>
                            <div className="pannel-body login-form">
                                <img src={anonymosPhoto} alt="profile"></img>
                                <div><p style={{ textAlign: "left" }}>Please take a few moments to update your profile with a picture and a few
                                 details about yourself. Property owners are more likely to respond more quickly
                                      to travelers with profiles.</p></div>
                            </div>
                            <div className="welcome-nevigate row">
                                <Link to="/" className="col-6">Continue</Link>
                                <Link to="/profile/update" className="col-6 btn btn-primary bg-blue">Update Your Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Welcome;