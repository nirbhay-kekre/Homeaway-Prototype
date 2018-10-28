import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import './profile.css'
import house from './house.png'
import { fetchProfileDetailAction, updateProfileAction } from '../../actions/userProfileAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import './profile.css'

class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.profile,
            isProfileUpdateSuccessfull: null,
            profilePhoto: null,
            profileUpateTempUrl: null,
            enableSubmitButton: false,
        };
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.updateProfileSubmitHandler = this.updateProfileSubmitHandler.bind(this);
    }

    stateChangeHandler = (e) => {
        let updateState = { enableSubmitButton: true };
        if (e.target.name === "profilePhoto") {
            updateState[e.target.name] = e.target.files[0];
            let fileReader = new FileReader();
            fileReader.onloadend = () => {
                updateState["profileUpateTempUrl"] = fileReader.result;
                this.setState(updateState);
            };
            fileReader.readAsDataURL(e.target.files[0]);
        } else {
            updateState[e.target.name] = e.target.value;
            this.setState(updateState);
        }
    }

    updateProfileSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const fdata = new FormData();
        fdata.append("firstname", this.state.firstname);
        fdata.append("lastname", this.state.lastname);
        fdata.append("aboutme", this.state.aboutme);
        fdata.append("city", this.state.city);
        fdata.append("company", this.state.company);
        fdata.append("school", this.state.school);
        fdata.append("hometown", this.state.hometown);
        fdata.append("languages", this.state.languages);
        fdata.append("gender", this.state.gender);
        fdata.append("phone", this.state.phone);
        fdata.append("profilefilepath", this.state.profilefilepath)
        fdata.append("profilePhoto", this.state.profilePhoto);
        try {
            await this.props.updateProfileAction(fdata);
            this.setState({
                isProfileUpdateSuccessfull: true,
                profilePhoto: null,
                profileUpateTempUrl: null,
                enableSubmitButton: false,
            })
        } catch (error) {
            this.setState({
                isProfileUpdateSuccessfull: false,
                profilePhoto: null,
                profileUpateTempUrl: null,
                enableSubmitButton: false,
            })
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.profile !== nextProps.profile) {
            //debugger;
            this.setState({
                ...nextProps.profile,
                profilePhoto: null,
                profileUpateTempUrl: null,
                enableSubmitButton: false,
            });
        }
    }

    componentDidMount() {
        this.props.fetchProfileDetailAction((JSON.parse(localStorage.getItem("loggedInUser"))).username);
    }

    render() {
        debugger;
        let redirectVar = null, feedbackMessage, imagePreview = this.state.profileUpateTempUrl ? this.state.profileUpateTempUrl : this.state.profilefilepath+"?"+new Date().getTime();
        if (!localStorage.getItem("loggedInUser") || !localStorage.getItem("jwtToken")) {
            redirectVar = <Redirect to="/login"></Redirect>
        }
        if (this.state.isProfileUpdateSuccessfull) {
            feedbackMessage = <div className="alert alert-success alert-dismissible row" role="alert">
                <div className="col-xs-2"><i className="material-icons">check_circle</i></div>
                <div className="col-xs-8 ml-2">
                    <strong>Success!</strong><br />
                    Your profile has been updated.
                </div>
                <div className="col-xs-2"><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        } else if (this.state.isProfileUpdateSuccessfull === false) {
            feedbackMessage = <div className="alert alert-danger alert-dismissible row" role="alert">
                <div className="col-xs-2"><i className="material-icons">warning</i></div>
                <div className="col-xs-8 ml-2">
                    <strong>Please try again.</strong><br />
                    Something went wrong when submitting your profile.<br />
                </div>
                <div className="col-xs-2"><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }

        return (
            <div className="profile-container container">
                {redirectVar}
                <div className="profile-v2">
                    {feedbackMessage}
                    <form onSubmit={this.updateProfileSubmitHandler}>
                        <div className="row">
                            <div className="m-auto d-flex flex-column ">
                                <img className="rounded-circle profile-pic-update" src={imagePreview} alt="profile"></img>
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="Add photo" type="file" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="file" id="profile-input" className="d-none" accept="image/jpeg, image/png" name="profilePhoto" onChange={this.stateChangeHandler}></input>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="m-auto d-flex flex-column ">
                                <h2 className="text-capitalize text-center">{this.props.profile.firstname} {this.props.profile.lastname}</h2>
                                <p className="text-muted text-center mb-3">Member since {this.state.createdOn}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Profile information</h4>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control profile-field" id="firstname" name="firstname" placeholder="First name" value={this.state.firstname} onChange={this.stateChangeHandler} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control profile-field" id="lastname" name="lastname" placeholder="Last name" value={this.state.lastname} onChange={this.stateChangeHandler} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <textarea type="text" className="form-control profile-field" rows="4" id="aboutme" name="aboutme" maxLength="255" placeholder="About me" value={this.state.aboutme} onChange={this.stateChangeHandler} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control profile-field" id="city" name="city" placeholder="My city" value={this.state.city} onChange={this.stateChangeHandler} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control profile-field" id="company" name="company" placeholder="Company" value={this.state.company} onChange={this.stateChangeHandler} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control profile-field" id="school" name="school" placeholder="School" value={this.state.school} onChange={this.stateChangeHandler} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control profile-field" id="hometown" name="hometown" placeholder="Hometown" value={this.state.hometown} onChange={this.stateChangeHandler} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="text" className="form-control profile-field" id="languages" name="languages" placeholder="Languages" value={this.state.languages} onChange={this.stateChangeHandler} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <select className="form-control profile-field" id="gender" name="gender" value={this.state.gender} onChange={this.stateChangeHandler}>
                                                    <option disabled="" hidden="" value="">Gender</option>
                                                    <option value="F">Female</option>
                                                    <option value="M">Male</option>
                                                    <option value="O">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-7">
                                                <input type="number" className="form-control profile-field" id="phone" name="phone" placeholder="phone" value={this.state.phone} onChange={this.stateChangeHandler} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn btn-md btn-primary  d-none d-sm-block p-2 m-3" disabled={!this.state.enableSubmitButton}>Save changes</button>
                                    <button className="btn btn-md btn-primary search-button d-block d-sm-none w-100 visibe-xs mt-3 m-3" disabled={!this.state.enableSubmitButton}>Save changes</button>
                                </div>
                            </div>
                            <div className="col-sm-4 d-none d-sm-block">
                                <div className="row card mb-3">
                                    <div className="card-body">
                                        <Link to="/profile/view/" className="btn btn-default btn-block default-border p-3 link">View profile</Link>
                                    </div>
                                </div>
                                <div className="row card mb-3">
                                    <div className="card-body ">
                                        <div className="d-flex justify-content-center">
                                            <i className="material-icons blue006 md100">perm_identity</i>
                                        </div>
                                        <h4 className="card-title text-center">Helpful tips</h4>
                                        <div className="container">

                                            <div className="row">
                                                <table className="table table-borderless">

                                                    <tbody>
                                                        <tr>
                                                            <td><i className="material-icons blue006">looks_one</i></td>
                                                            <td>Add a photo of yourself</td>
                                                        </tr>
                                                        <tr>
                                                            <td><i className="material-icons blue006">looks_two</i></td>
                                                            <td>Verify your identity</td>
                                                        </tr>
                                                        <tr>
                                                            <td><i className="material-icons blue006">looks_3</i></td>
                                                            <td>Describe your interests, hobbies and why you like to travel</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>

                                            <div className="row">
                                                <div className="pb-100"><img className="img-fluid" src={house} alt="profile"></img></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    profile: state.userProfileReducer.profile,
})

ProfileUpdate.propTypes = {
    profile: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, { fetchProfileDetailAction, updateProfileAction })(ProfileUpdate);