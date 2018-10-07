import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import SearchResultCard from '../search/searchResultCard'
import OwnerDashboardTab from './dashBoardTab'
import { Redirect } from 'react-router';
import Navbar from './../nav/navbar' 

class OwnerAllProperties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            forceReloadOnServerAuthFailureToggle: true
        }
        this.createCard = this.createCard.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:3000/property/all")
            .then(response => {
                if (response.data && response.data.results) {
                    this.setState({
                        searchResults: response.data.results
                    });
                }
            }).catch(error => {
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
                }
            });
    }
    createCard = () => {
        if (this.state.searchResults.length > 0) {
            return (
                <div>
                    <h3 className="m-4">All posted properties</h3>
                    {this.state.searchResults.map(result =>
                        <SearchResultCard
                            propertyId={result.propertyId}
                            photoUrl={result.photoUrl}
                            headline={result.headline}
                            street={result.street}
                            city={result.city}
                            state={result.state}
                            zip={result.zip}
                            bedroom={result.bedrrom}
                            bathroom={result.bathroom}
                            accomodates={result.accomodates}
                            amenities={result.amenities}
                            oneNightRate={result.oneNightRate}
                            cardFixedHeight="150px"
                            cardIndex={result.propertyId}
                        ></SearchResultCard>
                    )}
                </div>
            );
        } else {
            return (
                <div className="text-center align-middle m-5">
                    <i class="material-icons blue006 m-3">card_travel</i><br />
                    <h4>You haven't posted any properties yet</h4>
                </div>
            )
        }
    }
    render() {
        let redirectVar = null
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login/owner/"></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <Navbar showMenu={true} logo="blue"></Navbar>
                <OwnerDashboardTab currentComponent="OwnerAllProperties" />
                <div className="container">
                    {this.createCard()}
                </div>
            </div>
        )
    }
}

export default OwnerAllProperties;