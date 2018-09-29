import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../nav/navbar';
import axios from 'axios'
import cookie from 'react-cookies';
/*import { Redirect } from 'react-router';*/
import Default_profile_Pic from './default-profile-pic.png'
import './profileView.css'

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            aboutme: "",
            city: "",
            company: "",
            school: "",
            hometown: "",
            languages: "",
            profilefilepath: Default_profile_Pic,
            createdOn: "The beginning"
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/profile/view").then(response => {
            if (response.status === 200) {
                if (response.data) {
                    let { firstname, lastname, aboutme, city, company,
                        school, hometown, languages, profilefilepath, createdOn
                    } = response.data;
                    this.setState({
                        firstname: firstname,
                        lastname: lastname,
                        aboutme: aboutme ? aboutme : "The traveler hasn't written anything personal",
                        city: city ? city : "",
                        company: company ? company : "",
                        school: school ? school : "",
                        hometown: hometown ? hometown : "",
                        languages: languages ? languages : "",
                        profilefilepath: profilefilepath ? profilefilepath : Default_profile_Pic,
                        createdOn: createdOn ? new Date(createdOn).getFullYear() : "The beginning"
                    });

                }
            }
        });
    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Link to="/login"></Link>
        }

        return (
            <div>
                {redirectVar}
                <Navbar logo="blue"></Navbar>
                <div className="profile-container container">
                    <div className="profile-v2">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 col-md-offset-1 profile-edit text-right">

                                <Link to="/profile/update" className="row float-right link">
                                    <i class="material-icons col-xs-3">
                                        edit
                                </i>
                                    <span className="col-xs-9">Edit Profile</span></Link>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-4 col-sm-5 col-md-3 col-md-offset-1 mt-10">
                                <img className="float-right image-dim" src={this.state.profilefilepath} alt="profile"></img>
                            </div>
                            <div className="col-xs-8 col-sm-7 col-md-7">
                                <div className="user-detail">
                                    <h1>
                                        Hi, I'm {this.state.firstname} {this.state.lastname}
                                    </h1>
                                    <p className="text-muted">Member since {this.state.createdOn}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-5 col-md-3 col-md-offset-1 text-center"></div>
                            <div className="col-xs-12 col-sm-7 col-md-7 main-content-area">
                                <div className="profile-about">
                                    <h3>About me</h3>
                                </div>
                                <div >
                                    <p  className="text-muted">{this.state.aboutme}</p>
                                </div>
                                <div className="user-description">
                                    <div className="row">
                                        <p className="col-xs-6" className="text-muted">Hometown: &nbsp;</p>
                                        <p className="col-xs-6">{this.state.hometown}</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-xs-6" className="text-muted">Company: &nbsp;</p>
                                        <p className="col-xs-6">{this.state.company}</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-xs-6" className="text-muted">School: &nbsp;</p>
                                        <p className="col-xs-6">{this.state.school}</p>
                                    </div>
                                    <div className="row">
                                        <p className="col-xs-6" className="text-muted">Languages: &nbsp;</p>
                                        <p className="col-xs-6">{this.state.languages}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileView;