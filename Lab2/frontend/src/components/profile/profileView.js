import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { fetchProfileDetailAction } from '../../actions/userProfileAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import './profile.css'
import DEFAULT_PROFILE_PIC from './default-profile-pic.png'

class ProfileView extends Component {

    componentDidMount() {
        this.props.fetchProfileDetailAction();
    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login"></Redirect>
        }

        return (
            <div className="profile-container container">
                {redirectVar}

                <div className="row">
                    <div className="col-12 col-md-10 text-right">
                        <Link to="/profile/update" className="row float-right link">
                            <i class="material-icons col-xs-3">
                                edit
                                </i>
                            <span className="col-xs-9">Edit Profile</span>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 my-auto">
                        <img className="m-auto d-block image-dim" src={this.props.profile.profilefilepath} alt={DEFAULT_PROFILE_PIC}></img>
                    </div>
                    <div className="col-12 col-md-8 mx-auto">
                        <div className="row">
                            <h1>
                                Hi, I'm {this.props.profile.firstname} {this.props.profile.lastname}
                            </h1>
                        </div>
                        <div className="row mb-5">
                            <p className="text-muted">Member since {this.props.profile.createdOn}</p>
                        </div>
                        <div className="row">
                            <h3>About me</h3>
                        </div>
                        <div className="row mb-3">
                            <p className="text-muted">{this.props.profile.aboutme}</p>
                        </div>
                        <div className="row">
                            <p className="col-xs-6" className="text-muted">Hometown: &nbsp;</p>
                            <p className="col-xs-6">{this.props.profile.hometown}</p>
                        </div>
                        <div className="row">
                            <p className="col-xs-6" className="text-muted">Company: &nbsp;</p>
                            <p className="col-xs-6">{this.props.profile.company}</p>
                        </div>
                        <div className="row">
                            <p className="col-xs-6" className="text-muted">School: &nbsp;</p>
                            <p className="col-xs-6">{this.props.profile.school}</p>
                        </div>
                        <div className="row">
                            <p className="col-xs-6" className="text-muted">Languages: &nbsp;</p>
                            <p className="col-xs-6">{this.props.profile.languages}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.userProfileReducer.profile,
})

ProfileView.propTypes = {
    profile: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, { fetchProfileDetailAction })(ProfileView);