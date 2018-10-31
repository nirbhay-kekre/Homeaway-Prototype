import React, { Component } from 'react'
import OwnerDashboardTab from './dashboardTab'
import { Redirect } from 'react-router';
import Navbar from './../nav/navbar'
import PostProperty from './../postProperty/postProperty'

class OwnerPostProperties extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div> 
                {localStorage.getItem("jwtToken") ? "" : <Redirect to="/login/owner/" />}
                 {/*<Navbar showMenu={true} logo="blue"></Navbar>*/}
                <OwnerDashboardTab currentComponent="OwnerPostProperty" />
                <div className="container">
                    <PostProperty />
                </div>
            </div>
        )
    }
}

export default OwnerPostProperties;