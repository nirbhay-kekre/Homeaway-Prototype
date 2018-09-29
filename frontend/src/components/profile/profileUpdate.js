import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../nav/navbar';
import axios from 'axios'
import cookie from 'react-cookies';
/*import { Redirect } from 'react-router';*/
import Default_profile_Pic from './default-profile-pic.png'
import './profileView.css'
import house from './house.png'

class ProfileUpdate extends Component {
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
            gender: "",
            phone: "",
            profilefilepath: Default_profile_Pic,
            createdOn: "The beginning",
            isProfileUpdateSuccessfull: null,
            profilePhoto: null,
            profileUpateTempUrl: null,
            isSomethingUpdated: false,
        };
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.updateProfileSubmitHandler = this.updateProfileSubmitHandler.bind(this);
    }

    stateChangeHandler = (e) => {        
        let updateState = { isSomethingUpdated: true };
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

    updateProfileSubmitHandler = (e) => {
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
        axios.post("http://localhost:3001/profile/update", fdata)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                let profileUrl = Default_profile_Pic;
                if(response.data && response.data.profilefilepath){
                    profileUrl= response.data.profilefilepath;
                }
                this.setState({
                    isProfileUpdateSuccessfull: true,
                    profileUpateTempUrl: null,
                    isSomethingUpdated: false,
                    profilePhoto: null,
                    profilefilepath: profileUrl
                })
            }
        }).catch( error => {
            if (error.message === "Network Error") {
                this.setState({
                    isProfileUpdateSuccessfull: false,
                    errorMessage: "Server is not running, try again later",
                });
            }
            else if (error.response.status === 401 || error.response.status === 500 || error.response.status === 400) {
                this.setState({
                    isProfileUpdateSuccessfull: false,
                    errorMessage: error.response.data.message,
                })
            }
        });

        /* return false - will make sure my page doesn't reload and we dont have to wait
         for response of backend synchronusly, doing this will let me update the state 
         according to backend response
         */
        return false; 
    }


    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/profile/view").then(response => {
            if (response.status === 200) {
                if (response.data) {
                    let { firstname, lastname, aboutme, city, country, company,
                        school, hometown, languages, gender, phone, profilefilepath, createdOn
                    } = response.data;
                    this.setState({
                        firstname: firstname,
                        lastname: lastname,
                        aboutme: aboutme ? aboutme : "",
                        city: city ? city : "",
                        country: country ? country : "",
                        gender: gender ? gender : "",
                        company: company ? company : "",
                        school: school ? school : "",
                        phone: phone ? phone : "",
                        hometown: hometown ? hometown : "",
                        languages: languages ? languages : "",
                        profilefilepath: profilefilepath ? profilefilepath : Default_profile_Pic,
                        createdOn: createdOn ? new Date(createdOn).getFullYear() : "The beginning"
                    });

                }
            }
        })
    }

    render() {
        let redirectVar = null, feedbackMessage, imagePreview = this.state.profileUpateTempUrl ? this.state.profileUpateTempUrl : this.state.profilefilepath;
        if (!cookie.load('cookie')) {
            redirectVar = <Link to="/login"></Link>
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
                    Something went wrong when submitting your profile.<br/>
                    {this.state.errorMessage}
            </div>
                <div className="col-xs-2"><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }

        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
                <div className="profile-container container">
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
                                    <h2 className="text-capitalize text-center">{this.state.firstname} {this.state.lastname}</h2>
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
                                        <button className="btn btn-md btn-primary  d-none d-sm-block p-2 m-3" disabled={!this.state.isSomethingUpdated}>Save changes</button>
                                        <button className="btn btn-md btn-primary search-button d-block d-sm-none w-100 visibe-xs mt-3 m-3" disabled={!this.state.isSomethingUpdated}>Save changes</button>
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
            </div>
        );
    }
}

export default ProfileUpdate;