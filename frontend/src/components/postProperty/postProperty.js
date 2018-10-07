import React, { Component } from 'react'
import PostPropertyAmenities from './postPropertyAmenities'
import PostPropertyAvailibility from './postPropertyAvailablity'
import PostPropertyBookingMethod from './postPropertyBookingMethod'
import PostPropertyDetail from './postPropertyDetail'
import PostPropertyLocation from './postPropertyLocation'
import PostPropertyPhotos from './postPropertyPhotos'
import PostPropertyPrice from './postPropertyPrice'
import PostPropertySideTab from './PostPropertySideTab'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router';

class PostProperty extends Component {
    constructor(props) {
        super(props);
        this.currentToNextTabMapping = {
            location: "details",
            details: "bookingOptions",
            bookingOptions: "photos",
            photos: "amenities",
            amenities: "pricing",
            pricing: "availablity",
            availablity: "availablity"
        }
        this.currentToPrevTabMapping = {
            location: "location",
            details: "location",
            bookingOptions: "details",
            photos: "bookingOptions",
            amenities: "photos",
            pricing: "amenities",
            availablity: "pricing"
        }
        this.state = {
            currentTab: this.props.currentTab ? this.props.currentTab : "location",
            errorMessage: "",
            forceReloadOnServerAuthFailureToggle: true,
            redirectTo: null,
            location: {
                street: "",
                city: "",
                state: "",
                zip: "",
                country: "",
            },
            details: {
                headline: "",
                propertyDescription: "",
                propertyType: "",
                bedroom: "",
                bathroom: "",
                accomodates: "",
            },
            bookingOptions: {
                bookingOption: ""
            },
            photos: {
                propertyPhoto: []
            },
            previewPhotos: [],
            amenities: {
                amenity: [],
                other: "",
            },
            pricing: {
                oneNightRate: "",
                minNightStay: "",
            },
            availablity: {
                startDate: "",
                endDate: ""
            }
        }
        this.changeTab = this.changeTab.bind(this);
        this.validate = this.validate.bind(this);
        this.renderCurrentTab = this.renderCurrentTab.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.singleValuedFieldChangeHandler = this.singleValuedFieldChangeHandler.bind(this);
        this.validateAllPhotosAvailable = this.validateAllPhotosAvailable.bind(this);
        this.multiValuedFieldStateChangeHandler = this.multiValuedFieldStateChangeHandler.bind(this);
        this.postProperty = this.postProperty.bind(this);
        this.validateAllTabs = this.validateAllTabs.bind(this);
        this.checkFailureonTab = this.checkFailureonTab.bind(this);
        this.postPropertyPhotos = this.postPropertyPhotos.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    validate = (obj) => {
        let keys = Object.keys(obj);
        let missingFields = []
        for (let i = 0; i < keys.length; i++) {
            if (typeof obj[keys[i]] === "string" && obj[keys[i]] === "") {
                missingFields.push(keys[i])
            }
        }
        return missingFields;
    }

    changeTab = (e) => {
        if (this.state.currentTab === "amenities") {
            //no validation needed, property can have no amenities
            this.setState({
                currentTab: e.target.name,
                errorMessage: ""
            });
        } else if (this.state.currentTab === "photos") {
            if (this.validateAllPhotosAvailable()) {
                this.setState({
                    currentTab: e.target.name,
                    errorMessage: ""
                });
            }
            else {
                this.setState({
                    errorMessage: "Minimum 2 and Maximum 5 photos can be uploaded"
                })
            }
        }
        else {
            let missingFields = this.validate(this.state[this.state.currentTab]);
            if (missingFields.length === 0) {
                this.setState({
                    currentTab: e.target.name,
                    errorMessage: ""
                });
            } else {
                this.setState({
                    errorMessage: `Fields are missing: ${missingFields.join(", ")}`
                })
            }
        }
    }

    singleValuedFieldChangeHandler = (e) => {
        this.setState({
            [this.state.currentTab]: Object.assign({}, this.state[this.state.currentTab], { [e.target.name]: e.target.value })
        })
    }

    multiValuedFieldStateChangeHandler = (e) => {
        let keyVal = e.target.name.split("_");
        let obj = (this.state[this.state.currentTab][keyVal[0]]).slice();

        if (e.target.checked) {
            obj.push(keyVal[1]);
        }
        else {
            const index = obj.indexOf(keyVal[1]);
            if (index != -1) {
                obj.splice(index, 1);
            }
        }
        this.setState({
            [this.state.currentTab]: Object.assign({}, this.state[this.state.currentTab], { [keyVal[0]]: obj })
        });
    }

    postProperty = async (e) => {
        e.preventDefault();
        let missingTabs = this.validateAllTabs();
        if (missingTabs.length > 0) {
            this.setState({
                errorMessage: `Please populate ${missingTabs.join()} tab${missingTabs.length == 1 ? "" : "s"}`
            })
        } else {
            let payload = {
                ...this.state.location,
                ...this.state.bookingOptions,
                ...this.state.details,
                ...this.state.pricing
            }
            payload.amenities = this.state.amenities.amenity.slice()
            if (this.state.amenities.other) {
                payload.amenities.push(...this.state.amenities.other.split(",").map(i => i.trim()))
            }
            let blockDate = new Date(this.state.availablity.startDate);
            blockDate.setDate(blockDate.getDate() - 1);
            let date = blockDate.getUTCFullYear() + "-" + (blockDate.getUTCMonth() + 1) + "-" + blockDate.getUTCDate();
            payload.blockDate = [];
            payload.blockDate.push({
                startDate: "1000-01-01",
                endDate: date
            })
            blockDate = new Date(this.state.availablity.endDate);
            blockDate.setDate(blockDate.getDate() + 1);
            date = blockDate.getUTCFullYear() + "-" + (blockDate.getUTCMonth() + 1) + "-" + blockDate.getUTCDate();
            payload.blockDate.push({
                startDate: date,
                endDate: "9999-12-31"
            })
            payload.isActive = 1;
            axios.defaults.withCredentials = true;
            axios.post("http://localhost:3001/property/create", payload).then(
                this.postPropertyPhotos
            ).catch(error => {
                if (error.message === "Network Error") {
                    console.log("Server is down!");
                }
                else if (error.response.status === 401) {
                    cookie.remove("cookie");
                    this.setState({
                        forceReloadOnServerAuthFailureToggle: !this.state.forceReloadOnServerAuthFailureToggle
                    })
                } else if (error.response.status === 403) {
                    //user is forbidden to access owner page redirecting to home
                    this.props.history.push("/");
                } else if (error.response.status === 500) {
                    this.setState({
                        errorMessage: "Something went wrong, try again later"
                    })
                }
            });


        }
        return false;
    }

    redirectToHome = (response) => {
        if (response.status === 200) {
            this.setState({
                redirectTo: "/owner/dashboard/all"
            })
        }
    }

    postPropertyPhotos = (response) => {
        axios.defaults.withCredentials = true;
        const fdata = new FormData();
        fdata.append("propertyId", response.data.propertyId);
        for (let i=0; i<this.state.photos.propertyPhoto.length;i++){
            fdata.append("picture"+i, this.state.photos.propertyPhoto[i])
        }
        axios.post("http://localhost:3001/property/photos", fdata,
            {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }
        ).then(
            this.redirectToHome
        ).catch(error => {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            }
            else if (error.response.status === 401) {
                cookie.remove("cookie");
                this.setState({
                    forceReloadOnServerAuthFailureToggle: !this.state.forceReloadOnServerAuthFailureToggle
                })
            } else if (error.response.status === 403) {
                //user is forbidden to access owner page redirecting to home
                this.props.history.push("/");
            } else if (error.response.status === 500) {
                this.setState({
                    errorMessage: "Something went wrong, try again later"
                })
            }
        })

    }
    validateAllTabs = () => {
        let tabs = ["location",
            "details",
            "bookingOptions",
            "pricing", "availablity"];
        let failed = tabs.filter(this.checkFailureonTab);
        if (!this.validateAllPhotosAvailable()) {
            failed.push("photos")
        }
        return failed;
    }

    checkFailureonTab = (tab) => {
        return (this.validate(this.state[tab]).length > 0)
    }

    photoChangeHandler = async (e) => {
        let previewUrls = this.state.previewPhotos.slice();
        let propertyPhoto = this.state.photos.propertyPhoto.slice();
        if ((this.state.photos.propertyPhoto.length + e.propertyPhoto.length) < 6) {
            for (let i = 0; i < e.propertyPhoto.length; i++) {
                const fileUrl = await this.readFile(e.propertyPhoto[i]);
                previewUrls.push(fileUrl);
                propertyPhoto.push(e.propertyPhoto[i]);
            }
            this.setState({
                previewPhotos: previewUrls,
                errorMessage: "",
                photos: {
                    propertyPhoto
                }
            })
        } else {
            this.setState({
                errorMessage: "Maximum 5 photos can be uploaded"
            })
        }
    }

    readFile = (file) => {
        let fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                reject("Error occoured");
            }
            fileReader.onloadend = () => {
                resolve(fileReader.result);
            }
            fileReader.readAsDataURL(file);
        })
    }

    handleNextClick = (e) => {
        this.changeTab({
            target: {
                name: this.currentToNextTabMapping[this.state.currentTab]
            }
        });
    }

    handleBackClick = (e) => {
        this.changeTab({
            target: {
                name: this.currentToPrevTabMapping[this.state.currentTab]
            }
        })
    }
    validateAllPhotosAvailable = () => {
        if (this.state.photos.propertyPhoto.length >= 2 && this.state.photos.propertyPhoto.length < 6) {
            return true;
        }
        else {
            return false;
        }
    }

    renderCurrentTab = () => {
        let currentTabTag = null
        switch (this.state.currentTab) {
            case "location":
                currentTabTag = <PostPropertyLocation
                    street={this.state.location.street}
                    city={this.state.location.city}
                    state={this.state.location.state}
                    country={this.state.location.country}
                    zip={this.state.location.zip}
                    stateChangeHandler={this.singleValuedFieldChangeHandler}
                    submitLocation={this.handleNextClick}
                />
                break;
            case "details":
                currentTabTag = <PostPropertyDetail
                    headline={this.state.details.headline}
                    propertyDescription={this.state.details.propertyDescription}
                    propertyType={this.state.details.propertyType}
                    bedroom={this.state.details.bedroom}
                    bathroom={this.state.details.bathroom}
                    accomodates={this.state.details.accomodates}
                    backHandler={this.handleBackClick}
                    submitDetail={this.handleNextClick}
                    stateChangeHandler={this.singleValuedFieldChangeHandler}
                />
                break;
            case "bookingOptions":
                currentTabTag = <PostPropertyBookingMethod
                    submitBookinOption={this.handleNextClick}
                    bookingOption={this.state.bookingOptions.bookingOption}
                    stateChangeHandler={this.singleValuedFieldChangeHandler}
                    backHandler={this.handleBackClick}

                />
                break;
            case "photos":
                currentTabTag = <PostPropertyPhotos
                    stateChangeHandler={this.photoChangeHandler}
                    submitPhoto={this.handleNextClick}
                    uploadedImages={this.state.previewPhotos}
                    backHandler={this.handleBackClick}
                />
                break;
            case "amenities":
                currentTabTag = <PostPropertyAmenities
                    submitAmenities={this.handleNextClick}
                    amenity={this.state.amenities.amenity}
                    handleAminity={this.multiValuedFieldStateChangeHandler}
                    handleOtherAminity={this.singleValuedFieldChangeHandler}
                    backHandler={this.backHandler}
                    other={this.state.amenities.other}
                    backHandler={this.handleBackClick}
                />
                break;
            case "pricing":
                currentTabTag = <PostPropertyPrice
                    submitPrice={this.handleNextClick}
                    oneNightRate={this.state.pricing.oneNightRate}
                    minNightStay={this.state.pricing.minNightStay}
                    stateChangeHandler={this.singleValuedFieldChangeHandler}
                    backHandler={this.handleBackClick}
                />
                break;
            case "availablity":
                currentTabTag = <PostPropertyAvailibility
                    submitAvailablity={this.postProperty}
                    startDate={this.state.availablity.startDate}
                    endDate={this.state.availablity.endDate}
                    stateChangeHandler={this.singleValuedFieldChangeHandler}
                    backHandler={this.handleBackClick}
                />
                break;
        }
        return currentTabTag;
    }

    render() {
        let errorMessage = null;
        let redirectVar = null;

        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login/owner/"></Redirect>
        } else if (this.state.redirectTo) {
            redirectVar = <Redirect to={this.state.redirectTo} />
        }
        if (this.state.errorMessage) {
            errorMessage = <div className="alert alert-danger alert-dismissible row m-2" role="alert">
                <div className="col-1"><i className="material-icons">warning</i></div>
                <div className="col-11">
                    {this.state.errorMessage}
                </div>
                <div><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }
        return (
            <div className="container">
                {redirectVar}
                <div className="row">
                    <div className="col-3 border-right">
                        <PostPropertySideTab
                            handleClick={this.changeTab}
                            currentTab={this.state.currentTab}
                        />
                    </div>
                    <div className="col-9">
                        {errorMessage}
                        {this.renderCurrentTab()}
                    </div>
                </div>

            </div>
        )
    }
}

export default PostProperty;